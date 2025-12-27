// -- components
import Menu from '@components/Header/views/menu';
import ProductBrand from '@components/Product/ProductBrand/widgets/Default';

const BrandDetail = ({ slug }) => {
  return (
    <>
      <Menu data='brand' />
      <ProductBrand slug={slug} />
    </>
  );
};

export default BrandDetail;
