// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import MyAddress from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'My Address',
  link: 'user/address'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// User Page
// ==================

const MyAddressPage = async () => {
  return <MyAddress />;
};

export { metadata, schemadata };
export default MyAddressPage;
