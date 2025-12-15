// -- components
import Menu from '@components/Header/views/menu';
import ForgotPasswordWidget from '@components/ForgotPassword/widgets/Default';

const ForgotPassword = () => {
  return (
    <>
      <Menu data='forgot-password' />
      <ForgotPasswordWidget />
    </>
  );
};

export default ForgotPassword;
