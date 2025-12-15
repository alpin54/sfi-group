// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import UnderMaintenance from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Under Maintenance',
  link: 'under-maintenance'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Under Maintenance Page
// ==================

const UnderMaintenancePage = async () => {
  return <UnderMaintenance />;
};

export { metadata, schemadata };
export default UnderMaintenancePage;
