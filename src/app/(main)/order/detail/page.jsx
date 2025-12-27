// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import OrderDetail from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;

  return metaTag.dynamic({
    page: `Detail Pesanan`,
    link: `order-detail`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Order Detail Page
// ==================

const OrderDetailPage = async ({ params }) => {
  const slug = params.slug;

  return <OrderDetail slug={slug} />;
};

export { generateMetadata, schemadata };
export default OrderDetailPage;
