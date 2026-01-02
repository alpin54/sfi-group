// -- components
import Menu from '@components/Header/views/menu';
import OrderDetailWidget from '@components/Order/OrderSection/widgets/Default';

const OrderDetail = ({ slug }) => {
  return (
    <>
      <Menu data='order-detail' />
      <OrderDetailWidget slug={slug} variant='account' />
    </>
  );
};

export default OrderDetail;
