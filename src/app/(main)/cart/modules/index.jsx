// -- components
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';
import Menu from '@components/Header/views/menu';

const Cart = () => {
  return (
    <>
      <Menu data='cart' />
      <FallbackPages />
    </>
  );
};

export default Cart;
