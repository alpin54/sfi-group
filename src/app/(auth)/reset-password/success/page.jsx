// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessResetPassword from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Success Reset Password',
  link: 'reset-password/success'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessResetPasswordPage
// ==================

const SuccessResetPasswordPage = async () => {
  return <SuccessResetPassword />;
};

export { metadata, schemadata };
export default SuccessResetPasswordPage;
