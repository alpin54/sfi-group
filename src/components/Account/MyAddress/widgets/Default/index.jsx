'use client';

// // -- models
// import addressModel from '@components/Account/MyAddress/models';

// // -- hooks
// import useFirstLoad from '@hooks/useFirstLoad';

// -- components
import UserLayout from '@components/Account/Layouts/views';
import MyAddressView from '@components/Account/MyAddress/views';

// -- dummy data
import dummyData from '@components/Account/MyAddress/data/dummyData';
import regionDummy from '@components/Account/MyAddress/data/regionDummy';

const MyAddressWidget = () => {
  // const { data } = useFirstLoad(addressModel.list());
  // const { data: provinceData } = useFirstLoad(addressModel.province());

  return (
    <UserLayout>
      <MyAddressView data={dummyData} provinces={regionDummy} />
    </UserLayout>
  );
};

export default MyAddressWidget;
