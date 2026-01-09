'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@components/Career/CareerDetail/styles/style.module.scss';

// -- elements
import Button from '@elements/Button/views';
import Modal from '@elements/Modal/views';
import Input from '@elements/Input/views';
import SystemIcon from '@elements/SystemIcon/views';
// assets
import SuccesImage from '@assets/image/dummy/success.svg';

// -- model (dipakai jika ada, kalau tidak ada akan di-mock)
import careerDetailModel from '@components/Career/CareerDetail/models';

const CareerDetail = (props) => {
  const { data } = props;
  const successTimeout = useRef();

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const USE_API = false;

  // Form state (sesuai design: Full Name single field)
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    resume: null
  });
  const [resumeName, setResumeName] = useState('');
  const [errors, setErrors] = useState({});

  const rules = {
    full_name: {
      required: true,
      requiredMessage: 'Full name is required'
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

  // Validate single field
  const validateField = (name, value, file) => {
    if (name === 'resume') {
      if (!file) return rules.resume.requiredMessage;
      if (file.type !== 'application/pdf') return rules.resume.patternMessage;
      if (file.size > 3 * 1024 * 1024) return 'File size must be max 3 MB';
      return '';
    }

    if (rules[name].required && (!value || !String(value).trim())) {
      return rules[name].requiredMessage;
    }
    if (rules[name].pattern && value && !rules[name].pattern.test(value)) {
      return rules[name].patternMessage;
    }
    return '';
  };

  // Validate whole form
  const validate = () => {
    const newErrors = {};
    newErrors.full_name = validateField('full_name', form.full_name, null);
    newErrors.email = validateField('email', form.email, null);
    newErrors.phone = validateField('phone', form.phone, null);
    newErrors.resume = validateField('resume', '', form.resume);

    Object.keys(newErrors).forEach((k) => {
      if (!newErrors[k]) delete newErrors[k];
    });

    return newErrors;
  };

  // Handle input changes (works for Input component and file input)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      const file = files && files[0] ? files[0] : null;
      setForm((prev) => ({ ...prev, resume: file }));
      setResumeName(file ? file.name : '');
      setErrors((prev) => ({ ...prev, resume: validateField('resume', '', file) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value, null) }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // 🔹 VALIDASI TETAP JALAN
    const foundErrors = validate();
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      let submitResult;

      if (USE_API) {
        // 🔹 REAL API (nanti)
        const formData = new FormData();
        formData.append('full_name', form.full_name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        if (form.resume) formData.append('resume', form.resume);
        formData.append('career_id', data.id || '');
        formData.append('status', 1);

        submitResult = await careerDetailModel.submit(formData);
      } else {
        // 🔹 MOCK SUCCESS (sekarang)
        await new Promise((res) => setTimeout(res, 800));
        submitResult = {
          data: {
            data: true
          }
        };
      }

      if (submitResult?.data?.data) {
        setShowSuccess(true);

        // reset form
        setForm({
          full_name: '',
          email: '',
          phone: '',
          resume: null
        });
        setResumeName('');

        if (successTimeout.current) clearTimeout(successTimeout.current);
        successTimeout.current = setTimeout(() => setShowSuccess(false), 2000);
      } else {
        setMessage(submitResult?.error || submitResult?.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setMessage('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (successTimeout.current) clearTimeout(successTimeout.current);
    };
  }, []);

  return (
    <section className={style.section}>
      <div className='container'>
        <div className={style.wrapp}>
          <div className={style.backTo}>
            <button type='button' onClick={() => window.history.back()} className={style.btnBack}>
              <SystemIcon name='caret-left' size={14} />
              <span>Back</span>
            </button>
          </div>

          <div className={style.content}>
            {/* LEFT: Job detail */}
            <div className={style.left}>
              <h3 className={style.title}>{data.title}</h3>

              <div className={style.meta}>
                <div className={style.metaItem}>
                  <h6 className={style.metaLabel}>Work Type</h6>
                  <div className={style.metaValue}>
                    <SystemIcon name='timer' size={16} />
                    <span>{data.work_type || 'Full-Time'}</span>
                  </div>
                </div>

                <div className={style.metaItem}>
                  <h6 className={style.metaLabel}>Location</h6>
                  <div className={style.metaValue}>
                    <SystemIcon name='buildin-fill' size={16} />
                    <span>{data.location || 'On Site'}</span>
                  </div>
                </div>
              </div>

              {data.description && (
                <>
                  <h5 className={style.subtitle}>Description</h5>
                  <div className={style.body} dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </>
              )}

              {data.requirements && (
                <>
                  <h5 className={style.subtitle}>Requirements</h5>
                  <div className={style.body} dangerouslySetInnerHTML={{ __html: data.requirements }} />
                </>
              )}

              {data.benefits && (
                <>
                  <h5 className={style.subtitle}>Benefits</h5>
                  <div className={style.body} dangerouslySetInnerHTML={{ __html: data.benefits }} />
                </>
              )}
            </div>

            {/* RIGHT: Inline Apply Form */}
            <div className={style.right}>
              <form className={style.applyForm} onSubmit={handleSubmit} noValidate>
                <div className={style.formGroup}>
                  <label className={style.formLabel}>Full Name</label>
                  <Input
                    type='text'
                    name='full_name'
                    value={form.full_name}
                    onChange={handleChange}
                    error={errors.full_name}
                    autoComplete='name'
                  />
                </div>

                <div className={style.formGroup}>
                  <label className={style.formLabel}>Phone Number</label>
                  <Input
                    type='text'
                    name='phone'
                    value={form.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    autoComplete='tel'
                  />
                </div>

                <div className={style.formGroup}>
                  <label className={style.formLabel}>Email</label>
                  <Input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete='email'
                  />
                </div>

                <div className={`${style.formGroup} ${style.formFile}`}>
                  <label className={style.formLabel}>Resume / CV</label>
                  <label className={style.fileInputLabel}>
                    <input
                      type='file'
                      name='resume'
                      accept='application/pdf'
                      className={style.fileInputNative}
                      onChange={handleChange}
                    />
                    <div className={`${style.fileInputCustom} ${errors.resume ? style.error : ''}`}>
                      <span className={style.fileIcon}>
                        <SystemIcon name='link-simple' size={16} />
                      </span>
                      <span className={style.fileText}>{resumeName}</span>
                    </div>
                  </label>
                  <div className={style.fileDesc}>PDF only, max 3 MB.</div>
                  {errors.resume && <div className={style.errorMsg}>{errors.resume}</div>}
                </div>

                <div className={style.formGroup}>
                  <Button type='submit' disabled={loading} className={style.applyBtn}>
                    {loading ? 'Mengirim...' : 'Apply Now'}
                  </Button>
                  {message && <div className={style.errorMsg}>{message}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Success Modal */}
      <Modal open={showSuccess} onClose={() => setShowSuccess(false)} variant='success' closeIcon='hide'>
        <div>
          <Image
            src={SuccesImage}
            alt='Success'
            width={160}
            height={80}
            style={{ display: 'block', margin: '0 auto 16px' }}
          />
          <h5>Application Submitted 🎉</h5>
          <p>Thanks for applying! We’ve received your application and will review it shortly.</p>
        </div>
      </Modal>
    </section>
  );
};

export default CareerDetail;
