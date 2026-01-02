// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import Checkout from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;

  return metaTag.dynamic({
    page: `Checkout`,
    link: `checkout`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Order Detail Page
// ==================

const CheckoutPage = async ({ params }) => {
  const slug = params.slug;

  return <Checkout slug={slug} />;
};

export { generateMetadata, schemadata };
export default CheckoutPage;
