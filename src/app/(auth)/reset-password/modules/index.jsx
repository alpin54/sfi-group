// -- components
import Menu from '@components/Header/views/menu';
// import ResetPasswordWidget from '@components/ResetPassword/widgets/Default';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const ResetPassword = ({ customerId, token }) => {
  return (
    <>
      <Menu data='reset-password' />
      {/* <ResetPasswordWidget customerId={customerId} token={token} /> */}
      <FallbackPages />
    </>
  );
};

export default ResetPassword;
