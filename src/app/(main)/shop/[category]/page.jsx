// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShopCategory from './modules';
import reverseSlug from '@utils/reverseSlug';

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

const ShopCategoryPage = async () => {
  return <ShopCategory />;
};

export { generateMetadata, schemadata };
export default ShopCategoryPage;
