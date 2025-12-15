// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Faqs from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'FAQs',
  link: 'faqs'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Faqs Page
// ==================

const FaqsPage = async () => {
  return <Faqs />;
};

export { metadata, schemadata };
export default FaqsPage;
