// -- components
import Menu from '@components/Header/views/menu';
import ProductDetailSection from '@components/Product/ProductDetail/widgets/Default';

const ProductDetail = ({ slug }) => {
  return (
    <>
      <Menu data={slug} />
      <ProductDetailSection />
    </>
  );
};

export default ProductDetail;
