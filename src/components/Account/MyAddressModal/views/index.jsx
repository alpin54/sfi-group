import { useState, useEffect } from 'react';

import style from '@components/Account/MyAddress/styles/style.module.scss';
import addressDrawerModel from '@components/Account/MyAddressModal/models';
import Modal from '@elements/Modal/views';
import Button from '@elements/Button/views';
import Input from '@elements/Input/views';

const defaultForm = {
  id: undefined,
  label: '',
  recipient_name: '',
  phone: '',
  province_id: '',
  province_name: '',
  city_id: '',
  city_name: '',
  district_id: '',
  district_name: '',
  subdistrict_id: '',
  subdistrict_name: '',
  address: '',
  postal_code: '',
  is_default: false
};

const requiredFields = [
  'label',
  'recipient_name',
  'phone',
  'province_id',
  'province_name',
  'city_id',
  'city_name',
  'district_id',
  'district_name',
  'subdistrict_id',
  'subdistrict_name',
  'address',
  'postal_code'
];

const validateAddressForm = (form) => {
  const newErrors = {};
  requiredFields.forEach((field) => {
    if (!form[field] || String(form[field]).trim() === '') {
      newErrors[field] = 'This field is required';
    }
  });
  if (form.phone && !/^\d{8,15}$/.test(form.phone.replace(/\s/g, ''))) {
    newErrors.phone = 'Invalid phone number format';
  }
  if (form.postal_code && !/^\d{4,8}$/.test(form.postal_code)) {
    newErrors.postal_code = 'Invalid postcode';
  }
  return newErrors;
};

const mapProvince = (p) => ({ value: p.id, label: p.provinsi_name });
const mapCity = (c) => ({
  value: c.id,
  label: c.kabupaten_name
});
const mapDistrict = (d) => ({
  value: d.id,
  label: d.kecamatan_name
});
const mapSubdistrict = (s) => ({
  value: s.id,
  label: s.kelurahan_name
});

const MyAddressModalView = (props) => {
  const { open, onClose, method = 'add', initialValue = null, provinces = [], onSuccess } = props;

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Reset + populate all area if editing
  useEffect(() => {
    if (!open) return;

    const resetFormAsync = async () => {
      if (initialValue) {
        setForm({
          ...defaultForm,
          ...initialValue,
          province_id: initialValue.province_id ?? '',
          province_name: initialValue.province_name ?? '',
          city_id: initialValue.city_id ?? '',
          city_name: initialValue.city_name ?? '',
          district_id: initialValue.district_id ?? '',
          district_name: initialValue.district_name ?? '',
          subdistrict_id: initialValue.subdistrict_id ?? '',
          subdistrict_name: initialValue.subdistrict_name ?? '',
          is_default: !!initialValue.is_default
        });

        // Fetch cities, districts, subdistricts then ensure the selected one is in option
        // 1. CITIES (if province_id)
        let cts = [];
        if (initialValue.province_id) {
          const cityRes = await addressDrawerModel.cities(initialValue.province_id);
          cts = cityRes?.data?.data?.datas || [];
          setCities(cts);
        } else {
          setCities([]);
        }
        // 2. DISTRICTS (if city_id)
        let dts = [];
        if (initialValue.city_id) {
          const distRes = await addressDrawerModel.districts(initialValue.city_id);
          dts = distRes?.data?.data?.datas || [];
          setDistricts(dts);
        } else {
          setDistricts([]);
        }
        // 3. SUBDISTRICTS (if district_id)
        let sds = [];
        if (initialValue.district_id) {
          const subRes = await addressDrawerModel.subdistricts(initialValue.district_id);
          sds = subRes?.data?.data?.results || [];
          setSubdistricts(sds);
        } else {
          setSubdistricts([]);
        }
        // Set value again to force refresh component with new options ready
        setForm((f) => ({
          ...f
          // values already in initialValue, keep, just force re-set
        }));
      } else {
        setForm(defaultForm);
        setCities([]);
        setDistricts([]);
        setSubdistricts([]);
      }
      setErrors({});
    };

    resetFormAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValue]);

  // Province change => load cities dan map juga province_name
  useEffect(() => {
    if (form.province_id) {
      addressDrawerModel.cities(form.province_id).then((res) => setCities(res?.data?.data?.datas || []));
      const selectedProvince = provinces.find((p) => String(p.id) === String(form.province_id));
      setForm((f) => ({
        ...f,
        province_name: selectedProvince?.provinsi_name || '',
        city_id: '',
        city_name: '',
        district_id: '',
        district_name: '',
        subdistrict_id: '',
        subdistrict_name: ''
      }));
      setDistricts([]);
      setSubdistricts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.province_id]);

  // City change => load districts dan map juga city_name
  useEffect(() => {
    if (form.city_id) {
      addressDrawerModel.districts(form.city_id).then((res) => setDistricts(res?.data?.data?.datas || []));
      const selectedCity = cities.find((c) => String(c.id) === String(form.city_id));
      setForm((f) => ({
        ...f,
        city_name: selectedCity ? selectedCity.kabupaten_name : '',
        district_id: '',
        district_name: '',
        subdistrict_id: '',
        subdistrict_name: ''
      }));
      setSubdistricts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.city_id]);

  // District change => load subdistricts dan map district_name + postal_code
  useEffect(() => {
    if (form.district_id) {
      addressDrawerModel.subdistricts(form.district_id).then((res) => setSubdistricts(res?.data?.data?.results || []));
      const selectedDistrict = districts.find((d) => String(d.id) === String(form.district_id));
      setForm((f) => ({
        ...f,
        district_name: selectedDistrict?.kecamatan_name || '',
        postal_code: selectedDistrict?.postal_code || '',
        subdistrict_id: '',
        subdistrict_name: ''
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.district_id]);

  // Subdistrict change => map subdistrict_name
  const handleChange = (field, value) => {
    if (field === 'subdistrict_id') {
      const selectedSubdistrict = subdistricts.find((s) => String(s.id) === String(value));
      setForm((f) => ({
        ...f,
        subdistrict_id: value,
        subdistrict_name: selectedSubdistrict?.kelurahan_name || ''
      }));
    } else {
      setForm((f) => ({ ...f, [field]: value }));
    }
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const errs = validateAddressForm(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);

    try {
      const payload = { ...form };
      const methodType = method === 'add' ? 'post' : 'put';
      if (method === 'edit' && !payload.id) return;

      await addressDrawerModel.submit(payload, methodType);
      if (typeof onSuccess === 'function') await onSuccess();
    } catch (e) {
      setErrors({ form: e?.message || 'Failed to submit address' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={method === 'add' ? 'Add New Address' : 'Edit Address'}>
      <div className={style.drawerForm}>
        <div className={style.group}>
          <span className={style.labelForm}>Full Name</span>
          <div className={style.rowForm}>
            <Input
              value={form.recipient_name}
              onChange={(e) => handleChange('recipient_name', e.target.value)}
              name='recipient_name'
              error={errors.recipient_name}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>Phone Number</span>
          <div className={style.rowForm}>
            <Input
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
              name='phone'
              type='tel'
              error={errors.phone}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>Address Label</span>
          <div className={style.rowForm}>
            <Input
              value={form.label}
              onChange={(e) => handleChange('label', e.target.value)}
              name='label'
              error={errors.label}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>Province</span>
          <div className={style.rowForm}>
            <Input
              variant='select'
              // value={form.province_id}
              value={form.province_name}
              onChange={(e) => handleChange('province_id', e.target.value)}
              name='province_id'
              data={provinces.map(mapProvince)}
              error={errors.province_id}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>City</span>
          <div className={style.rowForm}>
            <Input
              variant='select'
              value={form.city_id}
              onChange={(e) => handleChange('city_id', e.target.value)}
              name='city_id'
              data={cities.map(mapCity)}
              error={errors.city_id}
              disabled={!form.province_id}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>District</span>
          <div className={style.rowForm}>
            <Input
              variant='select'
              value={form.district_id}
              onChange={(e) => handleChange('district_id', e.target.value)}
              name='district_id'
              data={districts.map(mapDistrict)}
              error={errors.district_id}
              disabled={!form.city_id}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>Subdistrict</span>
          <div className={style.rowForm}>
            <Input
              variant='select'
              value={form.subdistrict_id}
              onChange={(e) => handleChange('subdistrict_id', e.target.value)}
              name='subdistrict_id'
              data={subdistricts.map(mapSubdistrict)}
              error={errors.subdistrict_id}
              disabled={!form.district_id}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}> Street Address</span>
          <div className={style.rowForm}>
            <Input
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              name='address'
              error={errors.address}
            />
          </div>
        </div>
        <div className={style.group}>
          <span className={style.labelForm}>Postal Code</span>
          <div className={style.rowForm}>
            <Input value={form.postal_code} name='postal_code' error={errors.postal_code} readOnly={true} />
          </div>
        </div>
        {errors.form && <div className={style.fieldError}>{errors.form}</div>}
      </div>
      <div className={style.drawerFooter}>
        <div className={style.drawerFooterSet}>
          <label className={style.toggleLabel}>
            <input
              type='checkbox'
              checked={form.is_default}
              onChange={(e) => handleChange('is_default', e.target.checked)}
              className={style.toggleInput}
            />
            <span className={style.toggleSlider}></span>
            <span className={style.toggleText}>Set as Primary</span>
          </label>
        </div>

        <div className={style.drawerFooterButton}>
          {method === 'edit' ? (
            <>
              <Button variant='outlined' onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </>
          ) : (
            <>
              <Button variant='outlined' onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : 'Add New Address'}
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MyAddressModalView;
