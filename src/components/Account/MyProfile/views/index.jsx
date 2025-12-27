// -- libraries
import { useState, useMemo, useEffect } from 'react';

// -- styles
import style from '@components/Account/MyProfile/styles/style.module.scss';

// -- configs
import { EMAIL as EMAIL_REGEX } from '@configs/regex';

// -- states
import useStateUser from '@components/Account/MyProfile/states';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';
import validateForm from '@utils/validateForm';
import CookiesClient from '@utils/cookieClient';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Input from '@elements/Input/views';
import Modal from '@elements/Modal/views';
import Button from '@components/Elements/Button/views';

// -- components
import MemberProfile from '@components/Account/MyProfile/views/member';
import DealerProfile from '@components/Account/MyProfile/views/dealer';
import formatDate from '@utils/formatDate';
import Link from 'next/link';

// ----- Date helpers -----
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const years = Array.from({ length: 60 }, (_, i) => `${1980 + i}`);

function parseDateOfBirth(dobStr) {
  if (!dobStr) return { day: '', month: '', year: '' };
  const date = new Date(dobStr);
  if (isNaN(date.getTime())) return { day: '', month: '', year: '' };
  return {
    day: String(date.getDate()),
    month: months[date.getMonth()],
    year: String(date.getFullYear())
  };
}

function dateOfBirthToApi({ day, month, year }) {
  if (!day || !month || !year) return null;
  const mIdx = months.findIndex((m) => m === month);
  if (mIdx === -1) return null;
  const mm = String(mIdx + 1).padStart(2, '0');
  const dd = String(Number(day)).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function getDaysInMonth(month, year) {
  const mIdx = months.findIndex((m) => m === month);
  if (mIdx === -1) return 31;
  return new Date(Number(year), mIdx + 1, 0).getDate();
}
// ----- END Date helpers -----

// Phone validation
const isPhoneValid = (phone) => {
  if (!phone || String(phone).trim() === '') return false;
  return /^[0-9+\s()-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 8;
};

const MyProfileView = (props) => {
  const { data, onSubmit, loading: parentLoading, message: parentMessage } = props;
  const { setUser } = useStateUser();
  const [profile, setProfile] = useState(() => ({
    ...data,
    date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : ''
  }));

  const [editRow, setEditRow] = useState(null);
  const [editValue, setEditValue] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalHistory, setShowModalHistory] = useState(false);
  const [showModalVoucher, setShowModalVoucher] = useState(false);
  const [emailVerificationNeeded, setEmailVerificationNeeded] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    if (parentMessage) setFormMessage(parentMessage);
  }, [parentMessage]);

  useEffect(() => {
    const incoming = data && data.data ? data.data : (data ?? {});
    setProfile({
      ...incoming,
      date_of_birth: incoming.date_of_birth ? incoming.date_of_birth.split('T')[0] : ''
    });
  }, [data]);

  const daysInSelectedMonth = useMemo(() => {
    const { day, month, year } =
      editRow === 'date_of_birth' ? editValue : parseDateOfBirth(profile.date_of_birth || '');
    return month && year ? getDaysInMonth(month, year) : 31;
  }, [editRow, editValue, profile]);

  const handleCancel = () => {
    setEditRow(null);
    setEditValue({});
    setErrors({});
    setFormMessage('');
    setShowModal(false);
  };

  const validateField = (field, value) => {
    const rules = {};
    if (field === 'name') {
      rules.name = { required: true, minLength: 3, minLengthMessage: 'Name must be at least 3 characters' };
      return validateForm({ name: value }, rules);
    }
    if (field === 'email') {
      rules.email = { required: true, pattern: EMAIL_REGEX, patternMessage: 'Invalid email format' };
      return validateForm({ email: value }, rules);
    }
    if (field === 'phone') {
      rules.phone = {
        required: false,
        validate: (v) => {
          if (!v || String(v).trim() === '') return null;
          return isPhoneValid(v) ? null : 'Invalid phone number';
        }
      };
      return validateForm({ phone: value }, rules);
    }
    if (field === 'gender') {
      rules.gender = {
        required: false,
        validate: (v) => {
          if (!v) return null;
          return ['Male', 'Female'].includes(v) ? null : 'Invalid gender';
        }
      };
      return validateForm({ gender: value }, rules);
    }
    if (field === 'date_of_birth') {
      rules.date_of_birth = {
        required: false,
        validate: (v) => {
          if (!v) return null;
          if (!v.day || !v.month || !v.year) return 'Complete date of birth required';
          const apiDate = dateOfBirthToApi(v);
          const d = new Date(apiDate);
          if (isNaN(d.getTime())) return 'Invalid date';
          if (d > new Date()) return 'Date of birth cannot be in the future';
          return null;
        }
      };
      return validateForm({ date_of_birth: value }, rules);
    }
    return {};
  };

  const handleSave = async (field) => {
    setFormMessage('');
    setErrors({});
    let newProfile = { ...profile };

    if (field === 'date_of_birth') {
      const dobApi = dateOfBirthToApi(editValue);
      newProfile.date_of_birth = dobApi;
    } else {
      newProfile[field] = editValue[field];
    }

    const valResult = validateField(field, field === 'date_of_birth' ? editValue : editValue[field]);
    if (Object.keys(valResult).length > 0) {
      setErrors((prev) => ({ ...prev, [field]: valResult[field] || Object.values(valResult)[0] }));
      return;
    }

    const payload = {
      id: newProfile.id,
      [field]: newProfile[field]
    };

    setSaving(true);
    try {
      const apiResp = typeof onSubmit === 'function' ? await onSubmit(payload) : null;

      if (apiResp && apiResp.errors && typeof apiResp.errors === 'object') {
        setErrors(apiResp.errors);
        setFormMessage(apiResp.message || 'Validation failed');
        setSaving(false);
        return;
      }
      if (apiResp && apiResp.error) {
        setFormMessage(apiResp.error || apiResp.message || 'Failed to save');
        setSaving(false);
        return;
      }

      const updatedApiData = apiResp?.data ? apiResp.data : { ...profile, ...payload };

      setProfile({
        ...updatedApiData,
        date_of_birth: updatedApiData.date_of_birth ? updatedApiData.date_of_birth.split('T')[0] : ''
      });

      try {
        const existingUser = LocalStorage.get('user') || {};
        const userToStore = {
          ...existingUser,
          name: updatedApiData.name ?? existingUser.name,
          email: updatedApiData.email ?? existingUser.email
        };
        LocalStorage.set('user', userToStore);
        CookiesClient.set('user', userToStore);
        setUser(userToStore);
      } catch (e) {}

      if (field === 'email' && payload.email !== profile.email) {
        setEmailVerificationNeeded(true);
      }

      setEditRow(null);
      setEditValue({});
      setShowModal(false);
      setSaving(false);
    } catch (err) {
      const payloadErr = err?.payload ?? err?.response ?? null;
      if (payloadErr && payloadErr.errors) {
        setErrors(payloadErr.errors);
        setFormMessage(payloadErr.message || 'Failed to save');
      } else if (payloadErr && payloadErr.message) {
        setFormMessage(payloadErr.message);
      } else {
        setFormMessage('An unexpected error occurred while saving.  Please try again.');
      }
      setSaving(false);
    }
  };

  const handleEmailVerification = () => {
    setEmailVerificationNeeded(false);
    setFormMessage('Verification email sent (placeholder).');
  };

  const openEditModal = (field) => {
    setEditRow(field);
    setErrors({});
    setFormMessage('');
    setEditValue(
      field === 'date_of_birth' ? { ...parseDateOfBirth(profile.date_of_birth) } : { [field]: profile[field] ?? '' }
    );
    setShowModal(true);
  };

  // Get field icon
  const getFieldIcon = (field) => {
    const icons = {
      dealer: 'storefront',
      identity: 'identification-card',
      tax: 'identification-badge',
      name: 'user-circle-dashed',
      phone: 'phone',
      email: 'email-fill',
      date_of_birth: 'cake',
      gender: 'gender-intersex',
      password: 'password',
      address: 'map-pin-fill'
    };
    return icons[field] || 'edit';
  };

  // Get field label
  const getFieldLabel = (field) => {
    const labels = {
      dealer: 'Dealer Name',
      identity: 'Identity Card (KTP)',
      tax: 'Tax Document (NPWP)',
      name: 'Full Name',
      phone: 'Phone Number',
      email: 'Email Address',
      date_of_birth: 'Date of Birth',
      gender: 'Gender',
      password: 'Password',
      address: 'Address'
    };
    return labels[field] || field;
  };

  // Format display value
  const formatDisplayValue = (field, value) => {
    if (!value) return '-';
    if (field === 'date_of_birth') {
      const d = new Date(value);
      if (isNaN(d.getTime())) return '-';
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    }
    return value;
  };

  // Render card
  const renderCard = (field, value) => {
    return (
      <div className={style.card} key={field}>
        <div className={style.cardBox}>
          <div className={style.cardHeader}>
            <div className={style.cardIcon}>
              <SystemIcon name={getFieldIcon(field)} />
            </div>
            <p className={style.cardLabel}>{getFieldLabel(field)}</p>
          </div>
          <div className={style.cardContent}>
            <p className={style.cardValue}>
              {field === 'password' ? (
                `Last Updated: ${formatDate(value)}`
              ) : field === 'identity' || field === 'tax' ? (
                <Link className={style.cardDownload} href={value} download target='_blank' rel='noopener noreferrer'>
                  Unduh Review
                </Link>
              ) : (
                formatDisplayValue(field, value)
              )}
            </p>
            <Button
              variant='icon'
              onClick={() => openEditModal(field)}
              title='Edit'
              aria-label={`Edit ${getFieldLabel(field)}`}>
              <SystemIcon name='edit' />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Render modal content based on field
  const renderModalContent = () => {
    const fieldError = errors[editRow] ?? '';

    if (editRow === 'date_of_birth') {
      return (
        <div className={style.modalField}>
          <label className={style.modalLabel}>
            <SystemIcon name='cake' />
            <span>Date of Birth</span>
          </label>
          <div className={style.dobSelects}>
            <select
              value={editValue.day ?? ''}
              onChange={(e) => setEditValue((ev) => ({ ...ev, day: e.target.value }))}
              className={style.dobSelect}>
              <option value=''>Day</option>
              {[...Array(daysInSelectedMonth)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              value={editValue.month ?? ''}
              onChange={(e) => setEditValue((ev) => ({ ...ev, month: e.target.value }))}
              className={style.dobSelect}>
              <option value=''>Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={editValue.year ?? ''}
              onChange={(e) => setEditValue((ev) => ({ ...ev, year: e.target.value }))}
              className={style.dobSelect}>
              <option value=''>Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          {fieldError && <div className={style.fieldError}>{fieldError}</div>}
        </div>
      );
    }

    if (editRow === 'gender') {
      return (
        <div className={style.modalField}>
          <label className={style.modalLabel}>
            <SystemIcon name='gender-intersex' />
            <span>Gender</span>
          </label>
          <div className={style.genderOptions}>
            <label className={style.radioLabel}>
              <input
                type='radio'
                checked={editValue.gender === 'Male'}
                onChange={() => setEditValue((ev) => ({ ...ev, gender: 'Male' }))}
                name='gender'
              />
              <span>Male</span>
            </label>
            <label className={style.radioLabel}>
              <input
                type='radio'
                checked={editValue.gender === 'Female'}
                onChange={() => setEditValue((ev) => ({ ...ev, gender: 'Female' }))}
                name='gender'
              />
              <span>Female</span>
            </label>
          </div>
          {fieldError && <div className={style.fieldError}>{fieldError}</div>}
        </div>
      );
    }

    if (editRow === 'password') {
      return (
        <>
          <div className={style.modalField}>
            <label className={style.modalLabel}>
              <SystemIcon name={getFieldIcon(editRow)} />
              <span>{getFieldLabel(editRow)}</span>
            </label>
            <Input
              type='password'
              value={editValue.current_password ?? ''}
              onChange={(e) => {
                let val = e.target.value;
                setEditValue((ev) => ({ ...ev, current_password: val }));
                setErrors((prev) => ({ ...prev, current_password: undefined }));
                setFormMessage('');
              }}
              name='current_password'
              placeholder='Current Password'
              autoComplete='current-password'
              error={fieldError}
            />
          </div>
          <div className={style.modalField}>
            <Input
              type='password'
              value={editValue.new_password ?? ''}
              onChange={(e) => {
                let val = e.target.value;
                setEditValue((ev) => ({ ...ev, new_password: val }));
                setErrors((prev) => ({ ...prev, new_password: undefined }));
                setFormMessage('');
              }}
              name='new_password'
              placeholder='New Password'
              autoComplete='new-password'
              error={fieldError}
            />
          </div>
          <div className={style.modalField}>
            <Input
              type='password'
              value={editValue.repeat_password ?? ''}
              onChange={(e) => {
                let val = e.target.value;
                setEditValue((ev) => ({ ...ev, repeat_password: val }));
                setErrors((prev) => ({ ...prev, repeat_password: undefined }));
                setFormMessage('');
              }}
              name='repeat_password'
              placeholder='Repeat Password'
              autoComplete='repeat-password'
              error={fieldError}
            />
          </div>
        </>
      );
    }

    return (
      <div className={style.modalField}>
        <label className={style.modalLabel}>
          <SystemIcon name={getFieldIcon(editRow)} />
          <span>{getFieldLabel(editRow)}</span>
        </label>
        <Input
          type={editRow === 'phone' ? 'tel' : editRow === 'email' ? 'email' : 'text'}
          value={editValue[editRow] ?? ''}
          onChange={(e) => {
            let val = e.target.value;
            if (editRow === 'phone') val = val.replace(/[^0-9+\s()-]/g, '');
            setEditValue((ev) => ({ ...ev, [editRow]: val }));
            setErrors((prev) => ({ ...prev, [editRow]: undefined }));
            setFormMessage('');
          }}
          name={editRow}
          placeholder={getFieldLabel(editRow)}
          autoComplete={editRow}
          inputMode={editRow === 'phone' ? 'tel' : undefined}
          error={fieldError}
        />
      </div>
    );
  };

  return (
    <div className={style.profile}>
      <h2 className={style.greeting}>Hello, {profile.name || 'User'} 👋</h2>

      {profile.role === 'dealer' ? (
        <DealerProfile
          data={profile}
          showModal={showModal}
          showModalVoucher={showModalVoucher}
          setShowModalVoucher={setShowModalVoucher}
          renderModalContent={renderModalContent}
          renderCard={renderCard}
          saving={saving}
          editRow={editRow}
          parentLoading={parentLoading}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      ) : (
        <MemberProfile
          data={profile}
          showModal={showModal}
          showModalHistory={showModalHistory}
          setShowModalHistory={setShowModalHistory}
          renderModalContent={renderModalContent}
          renderCard={renderCard}
          saving={saving}
          editRow={editRow}
          parentLoading={parentLoading}
          handleCancel={handleCancel}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyProfileView;
