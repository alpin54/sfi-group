// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Promo from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Promo',
  link: 'promo'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Faqs Page
// ==================

const PromoPage = async () => {
  return <Promo />;
};

export { metadata, schemadata };
export default PromoPage;
