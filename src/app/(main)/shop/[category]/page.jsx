// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import reverseSlug from '@utils/reverseSlug';
import ShopCategory from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { category } = params;

  return metaTag.dynamic({
    page: reverseSlug(category),
    link: `${'shop'}/${category}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShopCategoryPage
// ==================

const ShopCategoryPage = async ({ params }) => {
  const { category } = params;
  return <ShopCategory category={category} />;
};

export { generateMetadata, schemadata };
export default ShopCategoryPage;
