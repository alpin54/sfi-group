// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import PrivacyPolicy from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Privacy Policy',
  link: 'privacy-policy'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUs Page
// ==================

const PrivacyPolicyPage = async () => {
  return <PrivacyPolicy />;
};

export { metadata, schemadata };
export default PrivacyPolicyPage;
