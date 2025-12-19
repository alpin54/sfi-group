// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import ShopSubCategory from './modules';
import reverseSlug from '@utils/reverseSlug';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { category, subCategory } = params;

  return metaTag.dynamic({
    page: reverseSlug(subCategory),
    link: `${'shop'}/${category}/${subCategory}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ShopSubCategoryPage
// ==================

const ShopSubCategoryPage = async () => {
  return <ShopSubCategory />;
};

export { generateMetadata, schemadata };
export default ShopSubCategoryPage;
