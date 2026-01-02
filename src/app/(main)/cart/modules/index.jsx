// -- components
import CartSection from '@components/Cart/CartSection/widgets/Default';
import Menu from '@components/Header/views/menu';

const Cart = () => {
  return (
    <>
      <Menu data='cart' />
      <CartSection />
    </>
  );
};

export default Cart;
