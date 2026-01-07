'use client';

// -- libraries
import { useState, useEffect } from 'react';

// -- styles
import style from '@components/ModalVoucher/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';
import formatDate from '@utils/formatDate';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Empty from '@elements/Empty/views';

const ModalVoucher = (props) => {
  const { data, setVoucher, onClose, onApply, selectedVoucher } = props;

  // local state
  const [items, setItems] = useState([]);

  // initialize items and mark checked if a voucher already exists in cart localStorage
  useEffect(() => {
    const cartObj = LocalStorage.get('cart') || { data: [], voucher: null };
    const appliedVoucher = selectedVoucher ?? cartObj?.voucher ?? null;

    const mapped = (data || []).map((it) => ({
      ...it,
      checked: appliedVoucher
        ? typeof appliedVoucher === 'number'
          ? appliedVoucher === it.id
          : appliedVoucher.id
            ? String(appliedVoucher.id) === String(it.id)
            : appliedVoucher.code === it.code
        : false
    }));
    setItems(mapped);
    if (typeof setVoucher === 'function') setVoucher(appliedVoucher);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedVoucher]);

  // Persist selected voucher into localStorage under cart.voucher OR delegate to parent via onApply
  const saveVoucherToCart = (voucherPayload) => {
    try {
      if (typeof onApply === 'function') {
        try {
          onApply(voucherPayload);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('ModalVoucher.onApply threw, falling back to localStorage', e);
        }
      } else {
        const cartKey = 'cart';
        const cartObj = LocalStorage.get(cartKey) || { data: [] };
        const nextCart = { ...cartObj, voucher: voucherPayload };
        LocalStorage.set(cartKey, nextCart);
      }

      if (typeof setVoucher === 'function') setVoucher(voucherPayload);
      if (typeof onClose === 'function') onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('saveVoucherToCart error', err);
      window.alert('Gagal menyimpan voucher');
    }
  };

  const selectItem = (id) => {
    const prevSelected = (items || []).find((it) => it.checked);
    const togglingOff = prevSelected && String(prevSelected.id) === String(id);

    if (togglingOff) {
      const next = (items || []).map((it) => ({ ...it, checked: false }));
      setItems(next);
      saveVoucherToCart(null);
      return;
    }

    // otherwise select the clicked voucher
    const next = (items || []).map((it) => ({ ...it, checked: String(it.id) === String(id) }));
    setItems(next);

    const selected = next.find((it) => String(it.id) === String(id)) || null;
    if (selected) {
      const voucherPayload = {
        id: selected.id,
        name: selected.name,
        code: selected.code,
        discount_type: selected.discount_type,
        discount_value: selected.discount_value,
        min_spend: selected.min_spend,
        valid_from: selected.valid_from,
        valid_until: selected.valid_until,
        max_discount: selected.max_discount ?? selected.maxDiscount
      };
      saveVoucherToCart(voucherPayload);
    } else {
      saveVoucherToCart(null);
    }
  };

  return (
    <div className={style.content}>
      <div className={style.list}>
        {items && items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={style.item}>
              <h6 className={style.discount}>
                {item.name}
                <span>
                  {item.discount_type === 'PERCENTAGE'
                    ? `${item.discount_value}%`
                    : Currency.formatRp(item.discount_value ?? 0)}
                </span>
              </h6>
              <h6 className={style.time}>{formatDate.remaining(item.valid_until)}</h6>
              <button
                className={style.button}
                type='button'
                onClick={() => selectItem(item.id)}
                aria-pressed={Boolean(item.checked)}
                aria-label={`Pilih voucher ${item.code}`}>
                {item.checked ? 'Dipakai' : 'Pakai'}
              </button>
              <div className={style.icon}>
                {item.checked ? <SystemIcon name='check' /> : <SystemIcon name='check-empty' />}
              </div>
            </div>
          ))
        ) : (
          <Empty variant='modal' description='Tidak ada voucher tersedia.' />
        )}
      </div>
    </div>
  );
};

export default ModalVoucher;
