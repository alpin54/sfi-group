// -- libraries
import { useState } from 'react';
import Image from 'next/image';

// -- utils
import Currency from '@utils/currency';

// -- styles
import style from '@components/Checkout/CheckoutShipping/styles/style.module.scss';

// elements
import SystemIcon from '@elements/SystemIcon/views';
import Button from '@elements/Button/views';

const CheckoutShipping = (props) => {
  const { data, onActiveChange, show, onClose } = props;

  // selectedId is controlled locally; initialize to null
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className={`${style.shipping} ${show ? style.shippingShow : ''}`.trim()}>
      <div className={style.top}>
        <h5 className={style.title}>Shipping Method</h5>
        <Button variant='icon' aria-label='Close' type='button' onClick={onClose}>
          <SystemIcon name='close' />
        </Button>
      </div>
      <div className={style.list}>
        {data.map((item, index) => {
          const itemId = item?.id ?? item?.courier ?? index;
          const checked = selectedId != null && String(itemId) === String(selectedId);
          return (
            <div
              key={`shipping-item-${index}`}
              className={`${style.item} ${checked ? style.itemActive : ''} ${checked ? 'active' : ''}`.trim()}>
              <div className={style.logo}>
                <Image className={style.logoEl} src={item.courier_icon} alt={item.courier} width={80} height={56} />
              </div>
              <div className={style.details}>
                <h6 className={style.courier}>{item.courier}</h6>
                <div className={style.info}>
                  <h6 className={style.price}>{Currency.formatRp(item.price)}</h6>
                  <span>&bull;</span>
                  <h6 className={style.etd}>{item.etd}</h6>
                </div>
              </div>
              <div className={style.icon}>
                <SystemIcon name={checked ? 'check' : 'check-empty'} />
              </div>
              <button
                className={style.button}
                type='button'
                aria-pressed={checked}
                onClick={() => {
                  setSelectedId(itemId);
                  if (typeof onActiveChange === 'function') onActiveChange(true);
                }}>
                {checked ? 'Checked' : 'Not checked'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutShipping;
