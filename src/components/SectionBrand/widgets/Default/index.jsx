// -- views
import SectionBrand from '@components/SectionBrand/views';

// -- data
import dummyData from '@components/SectionBrand/data';

const SectionBrandWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <SectionBrand data={dummyData} />;
};

export default SectionBrandWidget;
