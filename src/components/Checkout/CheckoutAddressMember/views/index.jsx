// -- libraries
import { useEffect, useMemo, useState } from 'react';

// -- styles
import style from '@components/Checkout/CheckoutAddressMember/styles/style.module.scss';

// -- assets
import ImgEmpty from '@assets/image/dummy/map-empty.svg';

// elements
import Button from '@components/Elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';
import Empty from '@elements/Empty/views';
import Input from '@elements/Input/views';
import Modal from '@elements/Modal/views';
import SwitchToggle from '@elements/SwitchToggle/views';

const CheckoutAddressMember = (props) => {
  const { onAddAddress, onSubmitSuccess } = props;

  const [openForm, setOpenForm] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [formIsDefault, setFormIsDefault] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // form structure (match member modal screenshot: no email)
  const formList = [
    { label: 'Full Name', name: 'full_name', id: 'full_name', type: 'text' },
    { label: 'Phone Number', name: 'phone', id: 'phone', type: 'tel' },
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
    { label: 'Postal Code', name: 'postal_code', id: 'postal_code', type: 'text' }
  ];

  const initialValues = formList.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const ERROR_MESSAGES = {
    full_name: { required: 'Oops! Full name can’t be empty.' },
    phone: {
      required: 'Oops! Phone number can’t be empty.',
      invalid: 'Hmm… that doesn’t look like a valid phone number.'
    },
    address_label: { required: 'Oops! Address label can’t be empty.' },
    province: { required: 'Oops! Province can’t be empty.' },
    city: { required: 'Oops! City can’t be empty.' },
    district: { required: 'Oops! District can’t be empty.' },
    sub_district: { required: 'Oops! Sub-district can’t be empty.' },
    street_address: { required: 'Oops! Street address can’t be empty.' },
    postal_code: { required: 'Oops! Postal code can’t be empty.' }
  };

  const validateField = (field, val) => {
    val = val?.trim();
    const msg = ERROR_MESSAGES[field.name];

    if (!val) return msg?.required || `${field.label} is required`;

    if (field.name === 'phone') {
      const p = /^\+?\d{10,15}$/;
      if (!p.test(String(val).replace(/\s/g, ''))) {
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

  // reset transient state when modal closes
  useEffect(() => {
    if (openForm) return;
    setLoading(false);
    setErrors({});
    setFormIsDefault(false);
    setEditingIndex(null);
  }, [openForm]);

  const currentAddress = useMemo(() => {
    if (!Array.isArray(addresses) || addresses.length === 0) return null;
    const def = addresses.find((a) => a?.is_default);
    return def || addresses[0];
  }, [addresses]);

  // prefill form when opening modal (add/edit)
  useEffect(() => {
    if (!openForm) return;

    if (editingIndex == null) {
      setValues(initialValues);
      setFormIsDefault(false);
      return;
    }

    const existing = addresses?.[editingIndex] || null;
    if (!existing) {
      setValues(initialValues);
      setFormIsDefault(false);
      return;
    }

    setValues((prev) => ({ ...prev, ...existing }));
    setFormIsDefault(!!existing.is_default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openForm]);

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

      payload.is_default = !!formIsDefault;

      const addressWithId = {
        ...payload,
        id: payload.id || (editingIndex != null ? addresses?.[editingIndex]?.id : undefined) || Date.now()
      };

      setAddresses((prev) => {
        const list = Array.isArray(prev) ? [...prev] : [];

        // If default is checked, clear previous defaults
        if (addressWithId.is_default) {
          for (let i = 0; i < list.length; i += 1) {
            list[i] = { ...list[i], is_default: false };
          }
        }

        if (editingIndex != null && list[editingIndex]) {
          list[editingIndex] = { ...list[editingIndex], ...addressWithId };
        } else {
          list.unshift(addressWithId);
        }

        const def = list.find((a) => a?.is_default);
        const selected = def || list[0] || null;
        if (typeof onSubmitSuccess === 'function') onSubmitSuccess(selected);

        return list;
      });

      setLoading(false);
      setOpenForm(false);
    }, 800);
  };

  const formattedAddress = currentAddress
    ? `${currentAddress.province}, ${currentAddress.city}, ${currentAddress.district}, ${currentAddress.sub_district}, ${currentAddress.street_address}, ${currentAddress.postal_code}`
    : '';

  const openAddForm = () => {
    setEditingIndex(null);
    // Close list first to avoid scroll-lock race, then open form
    setOpenList(false);
    setTimeout(() => setOpenForm(true), 0);
  };

  const openEditForm = (index) => {
    setEditingIndex(index);
    // Close list first to avoid scroll-lock race, then open form
    setOpenList(false);
    setTimeout(() => setOpenForm(true), 0);
  };

  const handleDelete = (index) => {
    setAddresses((prev) => {
      const list = Array.isArray(prev) ? [...prev] : [];
      list.splice(index, 1);

      const def = list.find((a) => a?.is_default);
      const selected = def || list[0] || null;
      if (typeof onSubmitSuccess === 'function') onSubmitSuccess(selected);

      if (list.length === 0) setOpenList(false);
      return list;
    });
  };

  return (
    <div className={style.address}>
      <div className={style.head}>
        <h5 className={style.headTitle}>Delivery Address</h5>
        <Button
          variant='arrow-text'
          type='button'
          onClick={() => {
            if (typeof onAddAddress === 'function') onAddAddress();
            if (addresses.length > 0) setOpenList(true);
            else setOpenForm(true);
          }}>
          {addresses.length > 0 ? 'Change Address' : 'Add Address'}
          <SystemIcon name='caret-right' />
        </Button>
      </div>

      {!currentAddress ? (
        <div className={style.empty}>
          <Empty
            image={ImgEmpty}
            title='Oops, you haven’t added any address.'
            description='Let’s add one so we know where to send your orders!'
            variant='address'
          />
        </div>
      ) : (
        <div className={style.card}>
          <div className={style.cardTop}>
            <h6 className={style.tag}>
              <SystemIcon name='tag' size={16} />
              <span>{currentAddress.address_label || 'Address'}</span>
            </h6>
            {currentAddress.is_default && (
              <h6 className={style.tag}>
                <span>&bull;</span>
                <span>Default</span>
              </h6>
            )}
          </div>
          <p className={style.line}>
            <SystemIcon name='user-circle-dashed' size={16} />
            <span className={style.value}>{currentAddress.full_name}</span>
          </p>
          <p className={style.line}>
            <SystemIcon name='phone-fill' size={16} />
            <span className={style.value}>{currentAddress.phone}</span>
          </p>
          <p className={style.line}>
            <SystemIcon name='map-pin-fill' size={16} />
            <span className={style.value}>{formattedAddress}</span>
          </p>
        </div>
      )}

      <Modal
        open={openForm}
        onClose={() => setOpenForm(false)}
        title={editingIndex != null ? 'Edit Address' : 'Add New Address'}
        size='small'
        variant='fullscreen'
        className='address'
        closeIcon='show'>
        <form className={style.modalForm} onSubmit={handleSubmit}>
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
          </div>

          <div className={style.toggleRow}>
            <SwitchToggle
              id='member-address-primary'
              checked={formIsDefault}
              disabled={loading}
              onChange={() => setFormIsDefault((prev) => !prev)}
              label=''
            />
            <span className={style.toggleText}>Set as Primary</span>
          </div>

          <div className={style.modalAction}>
            <Button type='button' variant='outlined' disabled={loading} onClick={() => setOpenForm(false)}>
              Cancel
            </Button>
            <Button type='submit' disabled={loading || !isActive}>
              {editingIndex != null ? 'Save' : 'Add New Address'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={openList}
        onClose={() => setOpenList(false)}
        title='Address'
        size='medium'
        variant='fullscreen'
        className='address'
        closeIcon='show'>
        <div className={style.listModal}>
          <div className={style.listTop}>
            <Button variant='outlined' size='medium' onClick={openAddForm}>
              <SystemIcon name='add' size={16} />
              <span>Add New Address</span>
            </Button>
          </div>

          <div className={style.list}>
            {addresses.map((addr, idx) => {
              const addrText = `${addr.province}, ${addr.city}, ${addr.district}, ${addr.sub_district}, ${addr.street_address}, ${addr.postal_code}`;
              const active = !!addr.is_default;
              return (
                <div key={addr.id ?? idx} className={`${style.listItem} ${active ? style.listItemActive : ''}`.trim()}>
                  <div className={style.listItemTop}>
                    <h6 className={style.tag}>
                      <SystemIcon name='tag' size={16} />
                      <span>{addr.address_label || 'Address'}</span>
                    </h6>
                    {addr.is_default && (
                      <h6 className={style.tag}>
                        <span>&bull;</span>
                        <span>Default</span>
                      </h6>
                    )}
                  </div>
                  <p className={style.line}>
                    <SystemIcon name='user-circle-dashed' size={16} />
                    <span className={style.value}>{addr.full_name}</span>
                  </p>
                  <p className={style.line}>
                    <SystemIcon name='phone-fill' size={16} />
                    <span className={style.value}>{addr.phone}</span>
                  </p>
                  <p className={style.line}>
                    <SystemIcon name='map-pin-fill' size={16} />
                    <span className={style.value}>{addrText}</span>
                  </p>
                  <div className={style.listActions}>
                    <Button onClick={() => openEditForm(idx)}>Edit Address</Button>
                    <Button variant='outlined' onClick={() => handleDelete(idx)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckoutAddressMember;
