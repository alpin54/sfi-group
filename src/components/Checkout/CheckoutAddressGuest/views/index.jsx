// -- libraries
import { useEffect, useMemo, useState } from 'react';

// -- styles
import style from '@components/Checkout/CheckoutAddressGuest/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// elements
import Input from '@elements/Input/views';
import Button from '@components/Elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';

const CheckoutAddress = (props) => {
  const { onActiveChange, onSubmitSuccess } = props;

  const { enableScroll, disableScroll } = useScrollable();

  const [loading, setLoading] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  // Lock body scroll when fullscreen drawer is open (mobile)
  useEffect(() => {
    if (showBody) disableScroll();
    else enableScroll();

    return () => enableScroll();
  }, [showBody, enableScroll, disableScroll]);

  // form structure
  const formList = [
    { label: 'Full Name', name: 'full_name', id: 'full_name', type: 'text' },
    { label: 'Phone Number', name: 'phone', id: 'phone', type: 'tel' },
    { label: 'Email', name: 'email', id: 'email', type: 'email' },
    { label: 'Address Label', name: 'address_label', id: 'address_label', type: 'text' },
    {
      label: 'Province',
      name: 'province',
      id: 'province',
      type: 'select',
      variant: 'select',
      data: [
        { label: 'DKI Jakarta', value: 'dki_jakarta' },
        { label: 'Jawa Barat', value: 'jawa_barat' },
        { label: 'Jawa Tengah', value: 'jawa_tengah' },
        { label: 'Jawa Timur', value: 'jawa_timur' },
        { label: 'Bali', value: 'bali' }
      ]
    },
    {
      label: 'City',
      name: 'city',
      id: 'city',
      type: 'select',
      variant: 'select',
      data: [
        { label: 'Jakarta Selatan', value: 'jakarta_selatan' },
        { label: 'Bandung', value: 'bandung' },
        { label: 'Semarang', value: 'semarang' },
        { label: 'Surabaya', value: 'surabaya' },
        { label: 'Denpasar', value: 'denpasar' }
      ]
    },
    {
      label: 'District',
      name: 'district',
      id: 'district',
      type: 'select',
      variant: 'select',
      data: [
        { label: 'Kebayoran Baru', value: 'kebayoran_baru' },
        { label: 'Coblong', value: 'coblong' },
        { label: 'Banyumanik', value: 'banyumanik' },
        { label: 'Wonokromo', value: 'wonokromo' },
        { label: 'Denpasar Barat', value: 'denpasar_barat' }
      ]
    },
    {
      label: 'Sub-district',
      name: 'sub_district',
      id: 'sub_district',
      type: 'select',
      variant: 'select',
      data: [
        { label: 'Gandaria Utara', value: 'gandaria_utara' },
        { label: 'Dago', value: 'dago' },
        { label: 'Srondol Wetan', value: 'srondol_wetan' },
        { label: 'Darmo', value: 'darmo' },
        { label: 'Pemecutan', value: 'pemecutan' }
      ]
    },
    { label: 'Street Address', name: 'street_address', id: 'street_address', type: 'text' },
    { label: 'Postal Code ', name: 'postal_code', id: 'postal_code', type: 'text' }
  ];

  // initial form values
  const initialValues = formList.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  // error messages
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
    address_label: {
      required: 'Oops! Address label can’t be empty.'
    },
    province: {
      required: 'Oops! Province can’t be empty.'
    },
    city: {
      required: 'Oops! City can’t be empty.'
    },
    district: {
      required: 'Oops! District can’t be empty.'
    },
    sub_district: {
      required: 'Oops! Sub-district can’t be empty.'
    },
    street_address: {
      required: 'Oops! Street address can’t be empty.'
    },
    postal_code: {
      required: 'Oops! Postal code can’t be empty.'
    }
  };

  // validate field
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

  const isActive = useMemo(() => {
    return formList.every((field) => {
      const val = values?.[field.name] ?? '';
      if (!String(val).trim()) return false;
      return !validateField(field, val);
    });
  }, [values]);

  useEffect(() => {
    if (typeof onActiveChange === 'function') onActiveChange(isActive);
  }, [isActive, onActiveChange]);

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

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      const payload = formList.reduce((acc, f) => {
        acc[f.name] = String(values?.[f.name] ?? '').trim();
        return acc;
      }, {});

      if (typeof onSubmitSuccess === 'function') onSubmitSuccess(payload);
      setSavedAddress(payload);
      setLoading(false);
      setShowBody(false);
    }, 800);
  };

  return (
    <div className={style.address}>
      <div className={style.head}>
        <h6 className={style.headTitle}>Delivery Address</h6>
        <Button variant='arrow-text' type='button' onClick={() => setShowBody(true)}>
          {savedAddress ? 'Change Address' : 'Add Address'}
          <SystemIcon name='caret-right' />
        </Button>
      </div>
      <div className={`${style.body} ${showBody ? style.bodyShow : ''}`.trim()}>
        <div className={style.inner}>
          <div className={style.top}>
            <h5 className={style.title}>Delivery Address</h5>
            <Button variant='icon' aria-label='Close' type='button' onClick={() => setShowBody(false)}>
              <SystemIcon name='close' />
            </Button>
          </div>
          <form
            id='checkout-address-form'
            className={`${style.form} ${isActive ? 'active' : ''}`.trim()}
            onSubmit={handleSubmit}>
            <div className={style.group}>
              {formList.map((field) => (
                <div className={style.field} key={field.name}>
                  <label htmlFor={field.id} className={style.label}>
                    {field.label}
                  </label>
                  <Input
                    id={field.id}
                    name={field.name}
                    variant={field.variant || 'input'}
                    type={field.type}
                    {...(field.variant === 'select'
                      ? {
                          data: field.data,
                          label: field.label
                        }
                      : {})}
                    value={values[field.name]}
                    onChange={(e) => handleInput(field, e.target.value)}
                    error={errors[field.name]}
                    disabled={loading}
                  />
                </div>
              ))}
              <div className={style.action}>
                <Button level='block' size='medium' type='submit'>
                  Save
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
