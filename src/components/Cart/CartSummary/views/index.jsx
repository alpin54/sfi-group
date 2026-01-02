// -- libary
import { useEffect, useMemo } from 'react';

// -- styles
import style from '@components/Cart/CartSummary/styles/style.module.scss';

// -- utils
import Currency from '@utils/currency';
import LocalStorage from '@utils/localStorage';

// -- elements
import Button from '@elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';
import SwitchToggle from '@elements/SwitchToggle/views';
import Link from 'next/link';

const CART_KEY = 'cart';

// Shared voucher calculation helper (kept local to component file for now)
const calcVoucher = (subtotal = 0, voucher) => {
  let discount = 0;
  let meetsMin = true;

  if (!voucher) {
    return { discountAmount: 0, meetsMinSpend: true, finalTotal: subtotal };
  }

  // if voucher is a primitive (like an ID), we cannot compute discount
  if (typeof voucher === 'number' || typeof voucher === 'string') {
    return { discountAmount: 0, meetsMinSpend: true, finalTotal: subtotal };
  }

  const minSpend = Number(voucher?.min_spend ?? voucher?.minSpend ?? 0);
  if (minSpend && subtotal < minSpend) {
    meetsMin = false;
    return { discountAmount: 0, meetsMinSpend: false, finalTotal: subtotal };
  }

  const type = (voucher?.discount_type ?? voucher?.type ?? '').toString().toUpperCase();
  const rawValue = Number(voucher?.discount_value ?? voucher?.discount ?? 0);

  if (type === 'PERCENTAGE' || type === 'PERCENT') {
    const pct = Number.isFinite(rawValue) ? rawValue : 0;
    discount = (subtotal * pct) / 100;
  } else if (type === 'FIXED' || type === 'AMOUNT') {
    discount = Number.isFinite(rawValue) ? rawValue : 0;
  } else {
    discount = 0;
  }

  // respect optional max discount field
  const maxDiscount = Number(voucher?.max_discount ?? voucher?.maxDiscount ?? 0);
  if (maxDiscount && Number.isFinite(maxDiscount)) {
    discount = Math.min(discount, maxDiscount);
  }

  if (discount > subtotal) discount = subtotal;

  const final = Math.max(0, subtotal - discount);
  return { discountAmount: discount, meetsMinSpend: meetsMin, finalTotal: final };
};

const CartSummary = (props) => {
  const { subtotal = 0, onOpenVoucher, voucher, setVoucher, disabled, points, setPoints } = props;
  const userStore = LocalStorage.get('user');

  // Keep voucher state in sync with storage in case other code updates it
  useEffect(() => {
    const readVoucherFromStorage = () => {
      try {
        const cartObj = LocalStorage.get(CART_KEY) || { data: [], voucher: null };
        setVoucher(cartObj?.voucher ?? null);
      } catch (err) {
        setVoucher(null);
      }
    };

    readVoucherFromStorage();

    // subscribe to changes if LocalStorage util supports it (keeps UI in sync)
    let unsubscribe = null;
    if (typeof LocalStorage.subscribe === 'function') {
      unsubscribe = LocalStorage.subscribe(CART_KEY, (newVal) => {
        try {
          setVoucher(newVal?.voucher ?? null);
        } catch (e) {
          // ignore
        }
      });
    } else {
      // fallback to window event if other code dispatches it
      const handler = () => readVoucherFromStorage();
      window.addEventListener('cart:updated', handler);
      unsubscribe = () => window.removeEventListener('cart:updated', handler);
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [setVoucher]);

  // compute discount & final total based on voucher and subtotal
  const { discountAmount, meetsMinSpend, finalTotal } = useMemo(
    () => calcVoucher(subtotal, voucher),
    [voucher, subtotal]
  );

  const renderVoucherText = () => {
    if (!voucher) return <span className={style.summaryBtnText}>Choose Your Promo</span>;

    if (typeof voucher === 'number' || typeof voucher === 'string') {
      return <span>{`Voucher #${voucher}`}</span>;
    }

    const name = voucher?.name ?? voucher?.code ?? (voucher.id ? `Voucher ${voucher.id}` : 'Voucher');
    const type = (voucher?.discount_type ?? voucher?.type ?? '').toString().toUpperCase();
    const value = Number(voucher?.discount_value ?? voucher?.discount ?? 0);
    const valueText = type === 'PERCENTAGE' || type === 'PERCENT' ? `${value}%` : Currency.formatRp(value);

    return (
      <span className={style.summaryBtnText}>
        {name} - <strong>{valueText}</strong>
      </span>
    );
  };

  return (
    <aside className={style.summary}>
      <div className={style.summaryBox}>
        {/* Voucher area */}
        <div className={`${style.summaryRow} ${style.button}`}>
          <div className={style.summaryRowItem}>
            <button type='button' className={style.summaryBtn} aria-label='Pilih Voucher' onClick={onOpenVoucher}>
              <SystemIcon name='voucher' />
              {renderVoucherText()}
              <SystemIcon name='caret-right' />
            </button>

            {/* If a voucher is applied show min_spend notice only (removal handled in VoucherModal) */}
            {voucher && !meetsMinSpend && (
              <p className={style.summaryDesc}>
                Voucher tidak berlaku Minimal belanja{' '}
                {Currency.formatRp(Number(voucher?.min_spend ?? voucher?.minSpend ?? 0))} untuk voucher ini.
              </p>
            )}
          </div>
          <div className={style.summaryRowItem}>
            <div className={style.summaryBtn} aria-label='Pilih Voucher' onClick={onOpenVoucher}>
              <SystemIcon name='e-voucher-circle' />
              <span className={style.summaryBtnText}>10 Points</span>
              <SwitchToggle id='use-points' checked={points} onChange={() => setPoints(!points)} label='' />
            </div>
            {/* <p className={style.summaryDesc}>
              Start Earning Reward Points Now{' '}
              <Link href='/sign-up' className={style.summaryLink}>
                Get Started
              </Link>
            </p> */}
          </div>
        </div>

        {/* Voucher discount row (only when applicable or when voucher present) */}
        {voucher && (
          <div className={style.summaryRow}>
            <h6 className={style.summaryLabel}>Voucher</h6>
            <h6 className={style.summaryValue}>{meetsMinSpend ? `- ${Currency.formatRp(discountAmount)}` : '-'}</h6>
          </div>
        )}

        <div className={`${style.summaryRow} ${style.subtotal}`}>
          <h6 className={style.summaryLabel}>Subtotal . 4 item</h6>
          <h6 className={style.summaryValue}>{Currency.formatRp(subtotal)}</h6>
        </div>

        {/* Final total */}
        <div className={`${style.summaryRow} ${style.total}`}>
          <h6 className={style.summaryLabel}>Total</h6>
          <h6 className={style.summaryValue}>{Currency.formatRp(finalTotal)}</h6>
        </div>

        {points && (
          <div className={`${style.summaryRow} ${style.total}`}>
            <h6 className={style.summaryLabel}>Point Earned</h6>
            <h6 className={style.summaryValue}>
              <SystemIcon name='e-voucher-circle' />
              <span>+10</span>
            </h6>
          </div>
        )}

        <div className={style.summaryRow}>
          <Button href='/checkout' variant='primary' disabled={true} level='block'>
            Checkout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default CartSummary;
