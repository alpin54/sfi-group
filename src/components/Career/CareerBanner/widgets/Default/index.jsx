// -- views
import CareerBanner from '@components/Career/CareerBanner/views';

// -- data dummy
import data from '@components/Career/CareerBanner/data';

const CareerBannerWidget = async () => {
  return <CareerBanner data={data} />;
};

export default CareerBannerWidget;
