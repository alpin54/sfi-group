// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import OrderDetail from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;

  return metaTag.dynamic({
    page: `Order Detail ${slug}`,
    link: `user/orders/${slug}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// OrderDetail Page
// ==================

const OrderDetailPage = async ({ params }) => {
  const { slug } = params;
  return <OrderDetail slug={slug} />;
};

export { generateMetadata, schemadata };
export default OrderDetailPage;
