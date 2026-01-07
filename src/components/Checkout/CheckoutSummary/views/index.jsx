// -- utils
import Currency from '@utils/currency';

// -- styles
import style from '@components/Checkout/CheckoutSummary/styles/style.module.scss';

// components
import CheckoutItem from '@components/Checkout/CheckoutItem/views';

// elements
import Button from '@elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';

const CheckoutSummary = (props) => {
  const { data, paymentDisabled } = props;
  const profile = String(data?.profile ?? '').toLowerCase();
  const isDealer = profile === 'dealer';
  const isMember = profile === 'member';
  const isGuest = profile === 'guest';
  const totalQty = Array.isArray(data?.list)
    ? data.list.reduce((sum, item) => sum + (Number(item?.quantity) || 0), 0)
    : 0;

  return (
    <div className={style.summary}>
      <div className={style.list}>
        {data.list.map((item, index) => (
          <CheckoutItem key={`checkout-item-${index}`} data={item} currency='IDR' />
        ))}
      </div>
      <div className={style.head}>
        <h6 className={style.headTitle}>Shipping Method</h6>
        <Button variant='arrow-text'>
          Select Shipping
          <SystemIcon name='caret-right' />
        </Button>
      </div>
      <div className={style.subtotal}>
        <div className={style.row}>
          <h6 className={style.label}>
            {data.subtotal.label} <span className={style.divider}>&bull;</span> {totalQty} Item
          </h6>
          <h6 className={style.value}>{Currency.formatRp(data.subtotal.value)}</h6>
        </div>
        <div className={style.row}>
          <h6 className={style.label}>{data.shipping_fee.label}</h6>
          <h6 className={style.value}>{Currency.formatRp(data.shipping_fee.value)}</h6>
        </div>
        <div className={style.row}>
          <h6 className={style.label}>
            {data.discount_general.label} <span className={style.divider}>&bull;</span> {data.discount_general.note}
          </h6>
          <h6 className={style.value}>-{Currency.formatRp(data.discount_general.value)}</h6>
        </div>
        {isMember && (
          <div className={style.row}>
            <h6 className={style.label}>{data.point_redemption.label}</h6>
            <h6 className={style.value}>
              <span className={style.point}>
                <SystemIcon name='e-voucher-circle' /> - {data.point_redemption.point}
              </span>
              <span className={style.divider}>&bull;</span>-{Currency.formatRp(data.point_redemption.value)}
            </h6>
          </div>
        )}
      </div>
      <div className={style.total}>
        <div className={style.row}>
          <h6 className={style.label}>{data.total_amount.label}</h6>
          <h6 className={style.value}>{Currency.formatRp(data.total_amount.value)}</h6>
        </div>
        {!isGuest && (isDealer || isMember) && (
          <div className={style.row}>
            {isDealer && (
              <>
                <h6 className={style.label}>{data.voucher_earned_dealer.label}</h6>
                <h6 className={style.value}>
                  <SystemIcon name='e-voucher' />
                  {Currency.formatRp(data?.voucher_earned_dealer.value)}
                </h6>
              </>
            )}
            {isMember && (
              <>
                <h6 className={style.label}>{data.voucher_earned_member.label}</h6>
                <h6 className={style.value}>
                  <SystemIcon name='e-voucher-circle' />
                  {data?.voucher_earned_member.value}
                </h6>
              </>
            )}
          </div>
        )}
      </div>
      <div className={style.action}>
        <Button level='block' type='submit' form='checkout-address-form' disabled={paymentDisabled}>
          Payment
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
