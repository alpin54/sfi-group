// -- components
import Menu from '@components/Header/views/menu';
import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessCreateAccount';

const SuccessCreateAccount = () => {
  return (
    <>
      <Menu data='success-create-account' />
      <AuthSuccessWidget />
    </>
  );
};

export default SuccessCreateAccount;
