// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import BrandDetail from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;
  return metaTag.dynamic({
    page: 'Brand',
    link: `brand/${slug}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Career Page
// ==================

const BrandPage = async ({ params }) => {
  const { slug } = params;
  return <BrandDetail slug={slug} />;
};

export { generateMetadata, schemadata };
export default BrandPage;
