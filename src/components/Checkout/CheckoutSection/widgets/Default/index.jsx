// -- models
// import orderModel from '@components/Checkout/CheckoutSection/models';

// -- views
import CheckoutView from '@components/Checkout/CheckoutSection/views';

// -- data
import dummyData from '@components/Checkout/CheckoutSection/data';

const CheckoutWidget = async () => {
  // data fetching
  // const { ready, data, error } = await checkoutModel.detail(slug);

  // return <CheckoutView ready={ready} data={data?.data} error={error} />;
  return <CheckoutView data={dummyData} />;
};

export default CheckoutWidget;
