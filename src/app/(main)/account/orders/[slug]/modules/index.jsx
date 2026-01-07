// -- components
import Menu from '@components/Header/views/menu';
import MyOrdersDetailWidget from '@components/Account/MyOrdersDetail/widgets/Default';

const OrderDetail = ({ slug }) => {
  return (
    <>
      <Menu data='myorders' />
      <MyOrdersDetailWidget slug={slug} variant='account' />
    </>
  );
};

export default OrderDetail;
