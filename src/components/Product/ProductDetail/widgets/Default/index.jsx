// -- components
import ProductDetailView from '@components/Product/ProductDetail/views';

// -- dummy
import dummyData from '@components/Product/ProductDetail/data';

const ProductDetailWidget = async ({ slug }) => {
  return <ProductDetailView data={dummyData} />;
};

export default ProductDetailWidget;
