'use client';

// -- libraries
import { useState, useRef, useEffect } from 'react';

// -- styles
import style from '@components/Career/CareerDetail/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';
import Input from '@elements/Input/views';

// Jika ingin model default, tetap import bisa, tapi di-handle di logic nanti
import careerDetailModel from '@components/Career/CareerDetail/models';

const CareerDetail = (props) => {
  const { data } = props;
  const [openModal, setOpenModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    resume: null
  });
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});
  const successTimeout = useRef();
  const rules = {
    first_name: {
      required: true,
      requiredMessage: 'First name is required'
    },
    last_name: {
      required: true,
      requiredMessage: 'Last name is required'
    },
    email: {
      required: true,
      requiredMessage: 'Email is required',
      pattern: /^\S+@\S+\.\S+$/,
      patternMessage: 'Invalid email format'
    },
    phone: {
      required: true,
      requiredMessage: 'Phone number is required',
      pattern: /^\+?[0-9]{8,15}$/,
      patternMessage: 'Invalid phone number format'
    },
    resume: {
      required: true,
      requiredMessage: 'File is required',
      pattern: /\.(pdf)$/i,
      patternMessage: 'Invalid file format. Only PDF is allowed.'
    }
  };

  // Helper: validate single field
  const validateField = (name, value, file) => {
    if (name === 'resume') {
      if (!file) return rules.resume.requiredMessage;
      if (file.type !== 'application/pdf') return rules.resume.patternMessage;
      if (file.size > 3 * 1024 * 1024) return 'File size must be max 3 MB';
      return '';
    }
    if (rules[name].required && !value.trim()) {
      return rules[name].requiredMessage;
    }
    if (rules[name].pattern && value && !rules[name].pattern.test(value)) {
      return rules[name].patternMessage;
    }
    return '';
  };

  // Helper: validate form for submit
  const validate = () => {
    const newErrors = {};
    newErrors.first_name = validateField('first_name', form.first_name, null);
    newErrors.last_name = validateField('last_name', form.last_name, null);
    newErrors.email = validateField('email', form.email, null);
    newErrors.phone = validateField('phone', form.phone, null);
    newErrors.resume = validateField('resume', '', form.resume);
    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });
    return newErrors;
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      const file = files[0];
      setForm((prev) => ({ ...prev, resume: file }));
      setResumeName(file ? file.name : '');
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, '', file)
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, null)
      }));
    }
  };

  // INTEGRASI handleSubmit ke onSubmit external
  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      // Persiapkan form data untuk dikirim
      const formData = new FormData();
      formData.append('first_name', form.first_name);
      formData.append('last_name', form.last_name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('resume', form.resume);
      formData.append('career_id', form.career_id);
      formData.append('status', 1);

      const { data } = await careerDetailModel.submit(formData);

      // Gunakan response sukses/failure dari handler submit
      if (data?.data) {
        setOpenModal(false);
        setShowSuccess(true);
        setForm({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          resume: null
        });
        setResumeName('');

        // Set timeout to close success modal after 2 seconds
        if (successTimeout.current) clearTimeout(successTimeout.current);
        successTimeout.current = setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      } else {
        // Handle jika response error
        const errorMsg =
          submitResult?.error || submitResult?.message || 'Failed to submit application. Please try again.';
        setMessage(errorMsg);
      }
    } catch (err) {
      // Handle jika terjadi error pas submit
      setMessage('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clean up timeout if component unmount
  useEffect(() => {
    return () => {
      if (successTimeout.current) clearTimeout(successTimeout.current);
    };
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    setShowSuccess(false);
    setErrors({});
    if (successTimeout.current) clearTimeout(successTimeout.current);
  };

  return (
    <section className={style.section}>
      <div className='container'>
        <div className={style.wrapp}>
          <h2 className={style.title}>{data.title}</h2>
          <div className={style.content}>
            <div className={style.detailGrid}>
              {data.responsibilities && (
                <div className={style.detailColumn}>
                  <h5 className={style.subtitle}>Responsibilities</h5>
                  <div
                    className={style.detailContent}
                    dangerouslySetInnerHTML={{ __html: data.responsibilities }}></div>
                </div>
              )}
              {data.qualifications && (
                <div className={style.detailColumn}>
                  <h5 className={style.subtitle}>Qualifications</h5>
                  <div className={style.detailContent} dangerouslySetInnerHTML={{ __html: data.qualifications }}></div>
                </div>
              )}
              {/* {data.benefit && (
                <div className={style.detailColumn}>
                  <h5 className={style.subtitle}>Benefits</h5>
                  <div className={style.detailContent} dangerouslySetInnerHTML={{ __html: data.benefit }}></div>
                </div>
              )} */}
            </div>
            <div className={style.btnWrapper}>
              <Button type='button' onClick={handleOpenModal}>
                APPLY
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Job Application */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title='Submit Job Application' size='small'>
        <form className={style.applyForm} onSubmit={handleSubmit}>
          <input type='hidden' name='career_id' value={data.id} />
          <div className={style.formRow}>
            <Input
              type='text'
              name='first_name'
              placeholder='First Name'
              value={form.first_name}
              onChange={handleChange}
              error={errors.first_name}
              autoComplete='off'
            />
          </div>
          <div className={style.formRow}>
            <Input
              type='text'
              name='last_name'
              placeholder='Last Name'
              value={form.last_name}
              onChange={handleChange}
              error={errors.last_name}
              autoComplete='off'
            />
          </div>
          <div className={style.formRow}>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete='off'
            />
          </div>
          <div className={style.formRow}>
            <Input
              type='text'
              name='phone'
              placeholder='Phone Number'
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              autoComplete='off'
            />
          </div>
          <div className={`${style.formRow} ${style.formFile}`}>
            <label className={style.fileInputLabel}>
              <input
                type='file'
                name='resume'
                accept='application/pdf'
                className={style.fileInputNative}
                onChange={handleChange}
              />
              <div className={`${style.fileInputCustom} ${errors.resume ? style.error : ''}`}>
                {resumeName || 'Resume / CV'}
              </div>
            </label>
            <div className={style.fileDesc}>PDF only, max 3 MB.</div>
            {errors.resume && <div className={style.errorMsg}>{errors.resume}</div>}
          </div>
          <div className={style.formRow}>
            <Button type='submit' disabled={loading}>
              {loading ? 'Mengirim...' : 'SUBMIT'}
            </Button>
            {message && <div className={style.errorMsg}>{message}</div>}
          </div>
        </form>
      </Modal>
      {/* Modal for Success */}
      <Modal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        variant='success'
        title='Application Submitted Successfully'
        closeIcon='hide'>
        <div>Thank you for applying. Our team will review your application and contact you if you are shortlisted.</div>
      </Modal>
    </section>
  );
};

export default CareerDetail;
