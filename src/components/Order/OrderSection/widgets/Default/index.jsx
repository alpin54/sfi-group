// -- models
// import orderModel from '@components/Order/OrderSection/models';

// -- views
import OrderView from '@components/Order/OrderSection/views';

// -- data
import dummyData from '@components/Order/OrderSection/data';

const OrderWidget = async ({ slug, variant = 'order' }) => {
  // data fetching
  // const { ready, data, error } = await orderModel.detail(slug);

  // return <OrderView ready={ready} data={data?.data} error={error} />;
  return <OrderView data={dummyData} variant={variant} />;
};

export default OrderWidget;
