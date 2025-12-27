// -- components
import Menu from '@components/Header/views/menu';
import OrderSection from '@components/Order/OrderSection/widgets/Default';

const OrderDetail = ({ slug }) => {
  return (
    <>
      <Menu data='order' />
      <OrderSection slug={slug} />
    </>
  );
};

export default OrderDetail;
