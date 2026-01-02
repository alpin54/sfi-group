// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import MyOrders from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'My Orders',
  link: 'user/orders'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MyOrders Page
// ==================

const MyOrdersPage = async () => {
  return <MyOrders />;
};

export { metadata, schemadata };
export default MyOrdersPage;
