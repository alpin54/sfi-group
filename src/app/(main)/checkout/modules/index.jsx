// -- components
import Menu from '@components/Header/views/menu';
import CheckoutSection from '@components/Checkout/CheckoutSection/widgets/Default';

const Checkout = ({ slug }) => {
  return (
    <>
      <Menu data='order' />
      <CheckoutSection slug={slug} />
    </>
  );
};

export default Checkout;
