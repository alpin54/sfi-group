// -- models
import myOrdersModel from '@components/Account/MyOrders/models';

// -- components
import UserLayout from '@components/Account/Layouts/views';
import MyOrdersView from '@components/Account/MyOrders/views';

// -- data
import data from '@components/Account/MyOrders/data';

const MyOrdersWidget = () => {
  return (
    <UserLayout>
      <MyOrdersView data={data} />
    </UserLayout>
  );
};

export default MyOrdersWidget;
