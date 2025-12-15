// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ContactUs from './modules';

// -- metadata
const metadata = metaTag.dynamic();

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HomePage
// ==================

const ContactUsPage = async () => {
  return <ContactUs />;
};

export { metadata, schemadata };
export default ContactUsPage;
