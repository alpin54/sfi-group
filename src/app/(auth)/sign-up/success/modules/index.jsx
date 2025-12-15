// -- components
import Menu from '@components/Header/views/menu';
// import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessCreateAccount';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const SuccessCreateAccount = () => {
  return (
    <>
      <Menu data='success-create-account' />
      {/* <AuthSuccessWidget /> */}
      <FallbackPages />
    </>
  );
};

export default SuccessCreateAccount;
