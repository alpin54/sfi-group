// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import reverseSlug from '@utils/reverseSlug';
import ShopSubCategory from './modules';

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

const ShopSubCategoryPage = async ({ params }) => {
  const { category, subCategory } = params;

  return <ShopSubCategory category={category} subCategory={subCategory} />;
};

export { generateMetadata, schemadata };
export default ShopSubCategoryPage;
