// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import User from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'User',
  link: 'user'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// UserPage
// ==================

const UserPage = async () => {
  return <User />;
};

export { metadata, schemadata };
export default UserPage;
