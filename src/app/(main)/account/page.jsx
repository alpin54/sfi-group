// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Account from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Account',
  link: 'account'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// AccountPage
// ==================

const AccountPage = async () => {
  return <Account />;
};

export { metadata, schemadata };
export default AccountPage;
