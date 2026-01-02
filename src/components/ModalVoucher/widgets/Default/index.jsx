'use client';

// -- models
import voucherModel from '@components/ModalVoucher/models';

// -- hooks
import useFirstLoad from '@hooks/useFirstLoad';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- views
import VoucherView from '@components/ModalVoucher/views';

const VoucherWidget = (props) => {
  // read cart from local storage (supports both array or object with .data)
  const rawCart = LocalStorage.get('cart') || [];
  const cartItems = Array.isArray(rawCart) ? rawCart : rawCart.data || [];

  // keep only items with checked: true
  const checkedItems = cartItems.filter((item) => item && item.checked === true);

  // transform to match payload:
  // { product: [ { productId: 1, quantity: 2 }, ... ] }
  const products = checkedItems.map((item) => ({
    productId: item.product_id ?? item.productId,
    quantity: Number(item.quantity ?? item.qty ?? 1)
  }));

  const payload = { product: products };

  // use a stable dependency for the hook (stringify payload)
  const { ready, data, error } = useFirstLoad(voucherModel.list(payload), []);

  return <VoucherView {...props} ready={ready} data={data?.vouchers} error={error} />;
};

export default VoucherWidget;
