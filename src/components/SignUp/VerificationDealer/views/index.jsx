'use client';

// -- libraries
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// -- styles
import style from '@components/SignUp/VerificationDealer/styles/style.module.scss';

// -- hooks
import useFormValidation from '@hooks/useFormValidation';

// -- elements
import Input from '@elements/Input/views';
import Button from '@elements/Button/views';
import SystemIcon from '@components/Elements/SystemIcon/views';

// -- components
import AuthSectionWidget from '@components/Auth/AuthSection/widgets/Default';

const VerificationDealer = (props) => {
  const { ready, data, error, onSubmit, loading, message } = props;
  const router = useRouter();

  // dummy dependent selects
  const provincesDummy = [
    { label: 'Province A', value: 'prov-a' },
    { label: 'Province B', value: 'prov-b' }
  ];

  const citiesDummy = {
    'prov-a': [
      { label: 'City A1', value: 'city-a1' },
      { label: 'City A2', value: 'city-a2' }
    ],
    'prov-b': [
      { label: 'City B1', value: 'city-b1' },
      { label: 'City B2', value: 'city-b2' }
    ]
  };

  const districtsDummy = {
    'city-a1': [{ label: 'District A1-1', value: 'dist-a11' }],
    'city-b1': [{ label: 'District B1-1', value: 'dist-b11' }]
  };

  const subdistrictsDummy = {
    'dist-a11': [{ label: 'Sub A1-1', value: 'sub-a11-1' }],
    'dist-b11': [{ label: 'Sub B1-1', value: 'sub-b11-1' }]
  };

  // form validation rules
  const rules = {
    dealerName: { required: true, requiredMessage: 'Dealer name is required' },
    province: { required: true, requiredMessage: 'Province is required' },
    city: { required: true, requiredMessage: 'City is required' },
    district: { required: true, requiredMessage: 'District is required' },
    subDistrict: { required: true, requiredMessage: 'Sub-district is required' },
    address: { required: true, requiredMessage: 'Street address is required' },
    postalCode: { required: true, requiredMessage: 'Postal code is required' }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setErrors } = useFormValidation(
    {
      dealerName: '',
      province: '',
      city: '',
      district: '',
      subDistrict: '',
      address: '',
      postalCode: ''
    },
    rules
  );

  // local file states + previews
  const [ktpFile, setKtpFile] = useState(null);
  const [npwpFile, setNpwpFile] = useState(null);
  const [ktpPreview, setKtpPreview] = useState(null);
  const [npwpPreview, setNpwpPreview] = useState(null);

  // helper: validate and set file + preview
  const handleFileChange = (e, setFile, setPreview, fieldKey) => {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setFile(null);
      setPreview(null);
      setErrors((prev) => {
        const copy = { ...(prev || {}) };
        delete copy[fieldKey];
        return copy;
      });
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowed.includes(f.type)) {
      setFile(null);
      setPreview(null);
      setErrors((prev) => ({ ...(prev || {}), [fieldKey]: 'Unsupported file type. Use jpg, png or pdf.' }));
      return;
    }

    if (f.size > maxSize) {
      setFile(null);
      setPreview(null);
      setErrors((prev) => ({ ...(prev || {}), [fieldKey]: 'File too large. Max 2MB.' }));
      return;
    }

    // clear file errors when OK
    setErrors((prev) => {
      const copy = { ...(prev || {}) };
      delete copy[fieldKey];
      return copy;
    });

    setFile(f);

    // if image, create preview URL; otherwise clear preview
    if (f.type.startsWith('image/')) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (ktpPreview) URL.revokeObjectURL(ktpPreview);
      if (npwpPreview) URL.revokeObjectURL(npwpPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dependent select options
  const cityOptions = citiesDummy[values.province] || [];
  const districtOptions = districtsDummy[values.city] || [];
  const subdistrictOptions = subdistrictsDummy[values.district] || [];

  const handleOnSubmit = async (formData) => {
    // require at least one document (KTP or NPWP)
    if (!ktpFile && !npwpFile) {
      setErrors((prev) => ({ ...(prev || {}), ktpFile: 'Please upload Identity Card (KTP) or Tax Document (NPWP).' }));
      return;
    }

    // build payload — include files. Parent onSubmit should handle multipart/form-data if needed.
    const payload = {
      ...formData,
      ktpFile,
      npwpFile
    };

    try {
      const response = await onSubmit(payload);

      if (response?.data) {
        // success: navigate (adjust route as needed)
        router.push('/sign-up/sucess-document');
        return;
      }

      if (response && response.errors) {
        setErrors(response.errors);
        return;
      }

      // fallback
      setErrors({ form: 'Registration failed. Please try again.' });
    } catch (err) {
      const resp = err?.response?.data || {};
      if (resp.errors && typeof resp.errors === 'object') {
        setErrors(resp.errors);
      } else {
        setErrors({ form: resp.message || 'An unexpected error occurred.' });
      }
      console.error('VerificationDealer submit error', err);
    }
  };

  // helpers to clear previews (kept but not used for "remove" button behavior)
  const clearKtp = () => {
    if (ktpPreview) {
      URL.revokeObjectURL(ktpPreview);
      setKtpPreview(null);
    }
    setKtpFile(null);
    setErrors((prev) => {
      const copy = { ...(prev || {}) };
      delete copy.ktpFile;
      return copy;
    });
  };

  const clearNpwp = () => {
    if (npwpPreview) {
      URL.revokeObjectURL(npwpPreview);
      setNpwpPreview(null);
    }
    setNpwpFile(null);
    setErrors((prev) => {
      const copy = { ...(prev || {}) };
      delete copy.npwpFile;
      return copy;
    });
  };

  return (
    <AuthSectionWidget images={data?.images} title={data?.title} description={data?.description}>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        {/* Dealer Name */}
        <div className={style.row}>
          <label className={style.label} htmlFor='dealerName'>
            Dealer Name
          </label>
          <Input
            type='text'
            name='dealerName'
            value={values.dealerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dealerName && errors.dealerName ? errors.dealerName : ''}
          />
        </div>

        {/* Province */}
        <div className={style.row}>
          <label className={style.label} htmlFor='province'>
            Province
          </label>
          <Input
            variant='select'
            name='province'
            data={[{ label: 'Select province', value: '' }, ...provincesDummy]}
            value={values.province}
            onChange={(e) => {
              handleChange(e);
              // reset dependent fields
              handleChange({ target: { name: 'city', value: '' } });
              handleChange({ target: { name: 'district', value: '' } });
              handleChange({ target: { name: 'subDistrict', value: '' } });
            }}
            onBlur={handleBlur}
            error={touched.province && errors.province ? errors.province : ''}
          />
        </div>

        {/* City */}
        <div className={style.row}>
          <label className={style.label} htmlFor='city'>
            City
          </label>
          <Input
            variant='select'
            name='city'
            data={[{ label: 'Select city', value: '' }, ...cityOptions]}
            value={values.city}
            onChange={(e) => {
              handleChange(e);
              handleChange({ target: { name: 'district', value: '' } });
              handleChange({ target: { name: 'subDistrict', value: '' } });
            }}
            onBlur={handleBlur}
            error={touched.city && errors.city ? errors.city : ''}
          />
        </div>

        {/* District */}
        <div className={style.row}>
          <label className={style.label} htmlFor='district'>
            District
          </label>
          <Input
            variant='select'
            name='district'
            data={[{ label: 'Select district', value: '' }, ...districtOptions]}
            value={values.district}
            onChange={(e) => {
              handleChange(e);
              handleChange({ target: { name: 'subDistrict', value: '' } });
            }}
            onBlur={handleBlur}
            error={touched.district && errors.district ? errors.district : ''}
          />
        </div>

        {/* Sub-district */}
        <div className={style.row}>
          <label className={style.label} htmlFor='subDistrict'>
            Sub-district
          </label>
          <Input
            variant='select'
            name='subDistrict'
            data={[{ label: 'Select sub-district', value: '' }, ...subdistrictOptions]}
            value={values.subDistrict}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.subDistrict && errors.subDistrict ? errors.subDistrict : ''}
          />
        </div>

        {/* Street Address */}
        <div className={style.row}>
          <label className={style.label} htmlFor='address'>
            Street Address
          </label>
          <Input
            type='text'
            name='address'
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address && errors.address ? errors.address : ''}
          />
        </div>

        {/* Postal Code */}
        <div className={style.row}>
          <label className={style.label} htmlFor='postalCode'>
            Postal Code
          </label>
          <Input
            type='text'
            name='postalCode'
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.postalCode && errors.postalCode ? errors.postalCode : ''}
          />
        </div>

        {/* File uploads - KTP */}
        <div className={style.row}>
          <label className={style.label}>Identity Card (KTP)</label>
          <div className={style.fileUpload}>
            <SystemIcon name='cloud-arrow-up' />
            <div className={style.helperText}>
              <div>Drag and drop files to upload</div>
              <div className={style.subText}>jpeg, jpg, png, pdf · max 2MB</div>
            </div>

            {/* native input (visually hidden by CSS) */}
            <Input
              type='file'
              accept='.jpg,.jpeg,.png,.pdf'
              onChange={(e) => handleFileChange(e, setKtpFile, setKtpPreview, 'ktpFile')}
              className={style.fileInputNative}
            />

            {/* preview or filename */}
            <div className={style.previewWrap}>
              {ktpPreview ? (
                <img src={ktpPreview} alt='ktp preview' className={style.previewImage} />
              ) : ktpFile ? (
                <div className={style.fileName}>{ktpFile.name}</div>
              ) : null}
            </div>

            <div className={style.fileActions}>
              {ktpFile ? (
                // edit/replace behavior: open file picker to replace
                <button
                  type='button'
                  className={style.editBtn}
                  onClick={() => {
                    const el = document.querySelector(`.${style.fileInputNative}`);
                    el && el.click();
                  }}>
                  <SystemIcon name='edit' />
                </button>
              ) : (
                <button
                  type='button'
                  className={style.selectBtn}
                  onClick={() => {
                    const el = document.querySelector(`.${style.fileInputNative}`);
                    el && el.click();
                  }}>
                  Select File
                </button>
              )}
            </div>

            {errors.ktpFile && <div className={style.errorMsg}>{errors.ktpFile}</div>}
          </div>
        </div>

        {/* File uploads - NPWP */}
        <div className={style.row}>
          <label className={style.label}>Tax Document (NPWP)</label>
          <div className={style.fileUpload}>
            <SystemIcon name='cloud-arrow-up' />
            <div className={style.helperText}>
              <div>Drag and drop files to upload</div>
              <div className={style.subText}>jpeg, jpg, png, pdf · max 2MB</div>
            </div>

            <Input
              type='file'
              accept='.jpg,.jpeg,.png,.pdf'
              onChange={(e) => handleFileChange(e, setNpwpFile, setNpwpPreview, 'npwpFile')}
              className={style.fileInputNative}
            />

            <div className={style.previewWrap}>
              {npwpPreview ? (
                <img src={npwpPreview} alt='npwp preview' className={style.previewImage} />
              ) : npwpFile ? (
                <div className={style.fileName}>{npwpFile.name}</div>
              ) : null}
            </div>

            <div className={style.fileActions}>
              {npwpFile ? (
                <button
                  type='button'
                  className={style.editBtn}
                  onClick={() => {
                    const els = document.querySelectorAll(`.${style.fileInputNative}`);
                    if (els && els[1]) els[1].click();
                  }}>
                  <SystemIcon name='edit' />
                </button>
              ) : (
                <button
                  type='button'
                  className={style.selectBtn}
                  onClick={() => {
                    const els = document.querySelectorAll(`.${style.fileInputNative}`);
                    if (els && els[1]) els[1].click();
                  }}>
                  Select File
                </button>
              )}
            </div>

            {errors.npwpFile && <div className={style.errorMsg}>{errors.npwpFile}</div>}
          </div>
        </div>

        {/* Submit */}
        <div className={style.row}>
          {errors.form && <div className={style.formMessage}>{errors.form}</div>}
          <Button type='submit' level='block' disabled={loading} rounded={false}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </div>
      </form>
    </AuthSectionWidget>
  );
};

export default VerificationDealer;
