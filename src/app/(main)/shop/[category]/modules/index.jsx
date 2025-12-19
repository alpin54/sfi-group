// -- components
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';
import Menu from '@components/Header/views/menu';

const ShopCategory = () => {
  return (
    <>
      <Menu data='shop' />
      <FallbackPages />
    </>
  );
};

export default ShopCategory;
