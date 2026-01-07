// -- components
import Menu from '@components/Header/views/menu';
import MyAddressWidget from '@components/Account/MyAddress/widgets/Default';

const UserMyAddress = () => {
  return (
    <>
      <Menu data='myaddress' />
      <MyAddressWidget />
    </>
  );
};

export default UserMyAddress;
