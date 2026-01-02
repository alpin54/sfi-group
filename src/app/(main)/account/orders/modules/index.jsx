// -- components
import Menu from '@components/Header/views/menu';
import MyOrdersWidget from '@components/Account/MyOrders/widgets/Default';

const UserMyOrders = () => {
  return (
    <>
      <Menu data='myorders' />
      <MyOrdersWidget />
    </>
  );
};

export default UserMyOrders;
