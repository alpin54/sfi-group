// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Maintenance from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Maintenance',
  link: 'maintenance'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// MaintenancePage
// ==================

const MaintenancePage = async () => {
  return <Maintenance />;
};

export { metadata, schemadata };
export default MaintenancePage;
