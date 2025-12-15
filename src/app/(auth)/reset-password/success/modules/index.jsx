// -- components
import Menu from '@components/Header/views/menu';
// import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessResetPassword';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const SuccessResetPassword = () => {
  return (
    <>
      <Menu menu='success-reset-password' />
      {/* <AuthSuccessWidget /> */}
      <FallbackPages />
    </>
  );
};

export default SuccessResetPassword;
