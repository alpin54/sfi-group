// -- components
import Menu from '@components/Header/views/menu';
// import ForgotPasswordWidget from '@components/ForgotPassword/widgets/Default';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const ForgotPassword = () => {
  return (
    <>
      <Menu data='forgot-password' />
      {/* <ForgotPasswordWidget /> */}
      <FallbackPages />
    </>
  );
};

export default ForgotPassword;
