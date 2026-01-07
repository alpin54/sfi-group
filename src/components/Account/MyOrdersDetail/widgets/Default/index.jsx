// -- components
import UserLayout from '@components/Account/Layouts/views';
import MyOrdersDetail from '@components/Account/MyOrdersDetail/views';

// -- data
import dummyData from '@components/Account/MyOrdersDetail/data';

const MyOrdersDetailWidget = ({ slug, variant }) => {
  return (
    <UserLayout>
      <MyOrdersDetail data={dummyData} variant={variant} />
    </UserLayout>
  );
};

export default MyOrdersDetailWidget;
