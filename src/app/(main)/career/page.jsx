// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Career from './modules';

// -- metadata
const metadata = metaTag.dynamic();

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// HomePage
// ==================

const CareerPage = async () => {
  return <Career />;
};

export { metadata, schemadata };
export default CareerPage;
