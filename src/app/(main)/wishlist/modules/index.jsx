// -- components
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';
import Menu from '@components/Header/views/menu';

const Wishlist = () => {
  return (
    <>
      <Menu data='wishlist' />
      <FallbackPages />
    </>
  );
};

export default Wishlist;
