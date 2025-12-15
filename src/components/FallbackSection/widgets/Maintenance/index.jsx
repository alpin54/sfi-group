// -- models
import fallbackModel from '@components/FallbackSection/models';

// -- views
import FallbackPages from '@components/FallbackSection/views';

// -- data
// import dummy from '@components/FallbackSection/data/maintenanceData';

const FallbackPagesWidget = async () => {
  const { data } = await fallbackModel.maintenance();
  return <FallbackPages {...data?.data} />;
};

export default FallbackPagesWidget;
