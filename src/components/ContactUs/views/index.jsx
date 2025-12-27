'use client';

import { useState } from 'react';
import Image from 'next/image';

// styles
import style from '@components/ContactUs/styles/style.module.scss';

// elements
import Button from '@elements/Button/views';
import Input from '@elements/Input/views';
import Modal from '@elements/Modal/views';
import SystemIcon from '@elements/SystemIcon/views';

// assets
import SuccesImage from '@assets/image/dummy/success.svg';

// social icons
import ShopeImg from '@assets/image/logo/shopee.svg';
import TokopediaImg from '@assets/image/logo/tokopedia.svg';
import Youtube from '@assets/image/logo/youtube.svg';
import Facebook from '@assets/image/logo/facebook.svg';
import Instagram from '@assets/image/logo/instagram.svg';
import Xlogo from '@assets/image/logo/x-logo.svg';
import Link from 'next/link';

const ContactUs = ({ data }) => {
  const content = data?.data ?? data ?? {};

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  // agreement checkbox
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [agreementError, setAgreementError] = useState('');

  const right = content?.right ?? {};

  // form structure
  const formList = [
    { label: 'Full Name', name: 'full_name', id: 'full_name', type: 'text' },
    { label: 'Phone Number', name: 'phone', id: 'phone', type: 'tel' },
    { label: 'Email', name: 'email', id: 'email', type: 'email' },
    { label: 'Company', name: 'company', id: 'company', type: 'text' },
    { label: 'Message', name: 'message', id: 'message', type: 'textarea' }
  ];

  // initial form values
  const initialValues = formList.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const ERROR_MESSAGES = {
    full_name: {
      required: 'Oops! Full name can’t be empty.'
    },
    phone: {
      required: 'Oops! Phone number can’t be empty.',
      invalid: 'Hmm… that doesn’t look like a valid phone number.'
    },
    email: {
      required: 'Oops! Email can’t be empty.',
      invalid: 'Hmm… that doesn’t look like a valid email.'
    },
    company: {
      required: 'Oops! Company name can’t be empty.'
    },
    message: {
      required: 'Oops! Message can’t be empty.'
    }
  };

  const validateField = (field, val) => {
    val = val?.trim();
    const msg = ERROR_MESSAGES[field.name];

    if (!val) return msg?.required || `${field.label} is required`;

    if (field.name === 'email') {
      const pat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pat.test(val)) return msg?.invalid || 'Invalid email format';
    }

    if (field.name === 'phone') {
      const p = /^\+?\d{10,15}$/;
      if (!p.test(val.replace(/\s/g, ''))) {
        return msg?.invalid || 'Invalid phone number';
      }
    }

    return '';
  };

  const validate = () => {
    const newErrors = {};

    formList.forEach((field) => {
      const err = validateField(field, values[field.name]);
      if (err) newErrors[field.name] = err;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInput = (field, value) => {
    setValues((prev) => ({ ...prev, [field.name]: value }));

    const err = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field.name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setAgreementError('');

    if (!validate()) return;

    if (!agreementChecked) {
      setAgreementError('Oops! You must agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setValues(initialValues);
      setErrors({});
      setAgreementChecked(false);

      setOpenModal(true);
      setLoading(false);

      setTimeout(() => setOpenModal(false), 1500);
    }, 800);
  };

  const contacts = Array.isArray(right.contacts) ? right.contacts : [];
  const socials = Array.isArray(right.socials?.list) ? right.socials.list : [];
  const marketplace = Array.isArray(right.marketplace?.list) ? right.marketplace.list : [];

  // mapping icon image
  const SOCIAL_ICON_MAP = {
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    twitter: Xlogo
  };

  const MARKET_ICON_MAP = {
    shopee: ShopeImg,
    tokopedia: TokopediaImg
  };

  return (
    <section className={style.contactUs}>
      <div className='container'>
        <h2 className={style.contactUs__title}>{content?.title}</h2>

        <div className={style.contactUs__wrapp}>
          {/* LEFT FORM */}
          <div className={style.contactUs__left}>
            <form className={style.contactUsForm} onSubmit={handleSubmit}>
              <div className={style.contactUs__formGroup}>
                {formList.map((field) => (
                  <div className={style.contactUs__formField} key={field.name}>
                    <label htmlFor={field.id} className={style.contactUs__label}>
                      {field.label}
                    </label>
                    <Input
                      id={field.id}
                      name={field.name}
                      variant={field.type === 'textarea' ? 'textarea' : undefined}
                      type={field.type === 'textarea' ? undefined : field.type}
                      value={values[field.name]}
                      onChange={(e) => handleInput(field, e.target.value)}
                      error={errors[field.name]}
                      disabled={loading}
                    />
                  </div>
                ))}
              </div>

              {/* AGREEMENT */}
              <div className={style.contactUs__agreement}>
                <div className={style.contactUs__agreementWrapp}>
                  <input
                    type='checkbox'
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                  />
                  <span className={style.contactUs__agreementText}>
                    I agree to the{' '}
                    <Link href={content?.agreement?.terms_url} className={style.contactUs__agreementLink}>
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href={content?.agreement?.privacy_url} className={style.contactUs__agreementLink}>
                      Privacy Policy
                    </Link>{' '}
                  </span>
                </div>

                {agreementError && <div className={style.contactUs__error}>{agreementError}</div>}
              </div>

              {/* BUTTON */}
              <div className={style.contactUs__formGroup}>
                <Button type='submit' disabled={loading} rounded={false}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>

              {message && <p className={style.contactUs__error}>{message}</p>}
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className={style.contactUs__right}>
            {/* VISIT US */}
            {right.visit?.title && (
              <div className={style.contactUs__rightBlock}>
                <h3 className={style.contactUs__rightTitle}>{right.visit.title}</h3>
                <div className={style.contactUs__rightMap}>
                  <SystemIcon name='map-pin-fill' size={20} />
                  <p className={style.contactUs__rightText}>{right.visit.address}</p>
                  <Link
                    className={style.contactUs__visitLink}
                    href={right.visit.link}
                    target='_blank'
                    rel='noopener noreferrer'></Link>
                </div>
              </div>
            )}

            {/* CONTACTS */}
            {contacts.length > 0 && (
              <div className={style.contactUs__rightBlock}>
                <h3 className={style.contactUs__rightTitle}>Let&apos;s Talk</h3>
                <ul className={style.contactUs__rightList}>
                  {contacts.map((item, i) => {
                    const lbl = (item.label || '').toLowerCase();
                    const value = item.value || '';

                    let icon = 'pin';
                    let href = null;

                    if (lbl.includes('phone')) {
                      icon = 'phone-fill';
                      href = `tel:${value}`;
                    } else if (lbl.includes('whatsapp')) {
                      icon = 'whatsapp-fill';
                      href = `https://wa.me/${value.replace(/[^\d]/g, '')}`;
                    } else if (lbl.includes('email')) {
                      icon = 'email-fill';
                      href = `mailto:${value}`;
                    }

                    return (
                      <li key={i} className={style.contactUs__rightItem}>
                        <SystemIcon name={icon} size={20} />
                        {href ? (
                          <Link href={href} target='_blank' className={style.contactUs__rightItemLink}>
                            {value}
                          </Link>
                        ) : (
                          <span>{value}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* SOCIALS — USING IMAGE */}
            {socials.length > 0 && (
              <div className={style.contactUs__rightBlock}>
                <h3 className={style.contactUs__rightTitle}>{right.socials.title}</h3>

                <div className={style.contactUs__socialIcons}>
                  {socials.map((soc, i) => {
                    const IconImg = SOCIAL_ICON_MAP[soc.icon] ?? null;
                    if (!IconImg) return null;

                    return (
                      <Link
                        key={i}
                        href={soc.url}
                        target='_blank'
                        rel='noreferrer'
                        className={style.contactUs__socialIconsLink}>
                        <Image
                          src={IconImg}
                          alt={soc.name}
                          width={30}
                          height={30}
                          className={style.contactUs__socialIconsImage}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MARKETPLACE — USING IMAGE */}
            {marketplace.length > 0 && (
              <div className={style.contactUs__rightBlock}>
                <h3 className={style.contactUs__rightTitle}>{right.marketplace.title}</h3>

                <div className={style.contactUs__marketIcons}>
                  {marketplace.map((mp, i) => {
                    const IconImg = MARKET_ICON_MAP[mp.icon] ?? null;
                    if (!IconImg) return null;

                    return (
                      <Link key={i} href={mp.url} target='_blank' className={style.contactUs__marketIconsLink}>
                        <Image
                          src={IconImg}
                          alt={mp.name}
                          width={34}
                          height={34}
                          className={style.contactUs__marketIconsImage}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL SUCCESS */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} variant='success' closeIcon='hide'>
        <div>
          <Image
            src={SuccesImage}
            alt='Success'
            width={160}
            height={80}
            style={{ display: 'block', margin: '0 auto 16px' }}
          />
          <h5>Your message has been sent 🎉</h5>
          <p>Our team will follow up shortly.</p>
        </div>
      </Modal>
    </section>
  );
};

export default ContactUs;
