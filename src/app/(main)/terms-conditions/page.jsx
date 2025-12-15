// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import TermsConditions from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Terms Conditions',
  link: 'terms-conditions'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUs Page
// ==================

const TermsConditionsPage = async () => {
  return <TermsConditions />;
};

export { metadata, schemadata };
export default TermsConditionsPage;
