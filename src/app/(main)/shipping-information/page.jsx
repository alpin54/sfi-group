// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Shipping from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Shipping & Returns',
  link: 'shipping-returns'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUs Page
// ==================

const ShippingPage = async () => {
  return <Shipping />;
};

export { metadata, schemadata };
export default ShippingPage;
