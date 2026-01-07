'use client';

// -- elements
import SystemIcon from '@components/Elements/SystemIcon/views';

// -- styles
import style from '@components/Account/MyOrdersDetail/styles/style.module.scss';

// -- components
import OrderSection from '@components/Order/OrderSection/views';
import Button from '@components/Elements/Button/views';

const MyOrdersDetail = (props) => {
  const { data, variant } = props;

  const buttonStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return style.statusPending;
      case 'SHIPPED':
        return style.statusShipped;
      case 'DELIVERED':
        return style.statusDelivered;
      case 'CANCELLED':
      case 'RETURNED':
        return style.statusCancelled;
      case 'PROCESSING':
        return style.statusProcessing;
      default:
        return '';
    }
  };
  return (
    <div className={style.ordersDetail}>
      <div className={style.head}>
        <div className={style.buttonLeft}>
          <button className={style.button}>
            <SystemIcon name='caret-left' width={16} height={16} />
            <span>Back</span>
          </button>
        </div>
        <div className={style.buttonRight}>
          {data.status === 'PENDING' ? (
            <>
              <Button variant='outlined'>Change Payment</Button>
              <Button>Cancel</Button>
            </>
          ) : data.status === 'SHIPPED' ? (
            <Button variant='outlined' disabled>
              Received
            </Button>
          ) : (
            <>
              <Button variant='outlined'>Change Payment</Button>
              <Button>Cancel</Button>
            </>
          )}
        </div>
      </div>
      <OrderSection data={data} variant={variant} />
    </div>
  );
};

export default MyOrdersDetail;
