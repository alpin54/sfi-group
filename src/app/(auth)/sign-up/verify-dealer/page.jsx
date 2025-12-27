// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerifyEmail from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Verify Email',
  link: 'sign-up/verify'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerifyEmailPage
// ==================

const VerifyEmailPage = async () => {
  return <VerifyEmail />;
};

export { metadata, schemadata };
export default VerifyEmailPage;
