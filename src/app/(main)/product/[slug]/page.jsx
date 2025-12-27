// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Product from './modules';
import reverseSlug from '@utils/reverseSlug';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;

  return metaTag.dynamic({
    page: reverseSlug(slug),
    link: `${'product'}/${slug}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// ProductPage
// ==================

const ProductPage = async ({ params }) => {
  const { slug } = params;
  return <Product slug={slug} />;
};

export { generateMetadata, schemadata };
export default ProductPage;
