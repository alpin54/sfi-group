// -- components
import Menu from '@components/Header/views/menu';
import ResetPasswordWidget from '@components/ResetPassword/Form/widgets/Default';

const ResetPassword = ({ customerId, token }) => {
  return (
    <>
      <Menu data='reset-password' />
      <ResetPasswordWidget customerId={customerId} token={token} />
    </>
  );
};

export default ResetPassword;
