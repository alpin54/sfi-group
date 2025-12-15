// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Wishlist from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Wishlist',
  link: 'wishlist'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// WishlistPage
// ==================

const WishlistPage = async () => {
  return <Wishlist />;
};

export { metadata, schemadata };
export default WishlistPage;
