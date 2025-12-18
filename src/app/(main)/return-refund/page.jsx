// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ReturnRefund from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Return & Refund Policy',
  link: 'return-refund'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AboutUs Page
// ==================

const ReturnRefundPage = async () => {
  return <ReturnRefund />;
};

export { metadata, schemadata };
export default ReturnRefundPage;
