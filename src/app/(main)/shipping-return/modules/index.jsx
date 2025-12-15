// -- components
import Menu from '@components/Header/views/menu';
import ShippingReturnContent from '@components/LegalContent/ShipingReturn/widgets/Default';

const Shipping = () => {
  return (
    <>
      <Menu data='shipping-return' />
      <ShippingReturnContent />
    </>
  );
};

export default Shipping;
