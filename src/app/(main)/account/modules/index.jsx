// -- components
import Menu from '@components/Header/views/menu';
import MyProfile from '@components/Account/MyProfile/widgets/Default';

const Account = () => {
  return (
    <>
      <Menu data='account' />
      <MyProfile />
    </>
  );
};

export default Account;
