// -- views
import Cta from '@components/Cta/views';

// -- data
import dummyData from '@components/Cta/data';

const CtaWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <Cta data={dummyData} />;
};

export default CtaWidget;
