// -- components
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';
import Menu from '@components/Header/views/menu';

const ShopSubCategory = () => {
  return (
    <>
      <Menu data='shop' />
      <FallbackPages />
    </>
  );
};

export default ShopSubCategory;
