'use client';

// -- models
import cartModel from '@components/Cart/CartSection/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- views
import CartSectionView from '@components/Cart/CartSection/views';

// -- data
import dummyData from '@components/Cart/CartSection/data';

const CartSectionWidget = (props) => {
  // const cart = LocalStorage.get('cart') || { data: [], voucher: null };

  // const { ready, data, error } = useFirstLoad(cartModel.list(cart?.data));

  return (
    <CartSectionView {...props} ready={true} data={dummyData} recommendedData={dummyData.recommended} error={false} />
  );
};

export default CartSectionWidget;
