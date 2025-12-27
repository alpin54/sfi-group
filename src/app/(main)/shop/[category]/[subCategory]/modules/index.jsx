// -- components
import Menu from '@components/Header/views/menu';
import ProductList from '@components/Product/ProductList/widgets/Default';

const ShopSubCategory = ({ category, subCategory }) => {
  return (
    <>
      <Menu data='shop' />
      <ProductList category={category} subCategory={subCategory} />
    </>
  );
};

export default ShopSubCategory;
