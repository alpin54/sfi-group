// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ResetPassword from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Reset Password',
  link: 'reset-password'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ResetPasswordPage
// ==================
const ResetPasswordPage = async ({ searchParams }) => {
  const customerId = Array.isArray(searchParams?.customerId) ? searchParams.customerId[0] : searchParams?.customerId;
  const token = Array.isArray(searchParams?.token) ? searchParams.token[0] : searchParams?.token;

  if (!customerId || !token) {
    return <ResetPassword customerId={customerId} token={token} />;
  }

  return <ResetPassword customerId={customerId} token={token} />;
};

export { metadata, schemadata };
export default ResetPasswordPage;
