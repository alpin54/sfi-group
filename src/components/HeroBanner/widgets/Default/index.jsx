// -- models
import heroBannerModel from '@components/HeroBanner/models';

// -- views
import HeroBannerView from '@components/HeroBanner/views';

// -- data
import dummyData from '@components/HeroBanner/data';

const HeroBannerWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <HeroBannerView data={dummyData} />;
};

export default HeroBannerWidget;
