// -- components
import Menu from '@components/Header/views/menu';
import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessResetPassword';

const SuccessResetPassword = () => {
  return (
    <>
      <Menu menu='success-reset-password' />
      <AuthSuccessWidget />
    </>
  );
};

export default SuccessResetPassword;
