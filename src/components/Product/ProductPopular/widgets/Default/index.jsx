// -- views
import ProductPopular from '@components/Product/ProductPopular/views';

// -- data dummy
import data from '@components/Product/ProductPopular/data';

const ProductPopularWidget = () => {
  return <ProductPopular data={data} />;
};

export default ProductPopularWidget;
