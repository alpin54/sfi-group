// -- views
import HighligtProductCategory from '@components/HighligtProductCategory/views';

// -- data
import dummyData from '@components/HighligtProductCategory/data';

const HighligtProductCategoryWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <HighligtProductCategory data={dummyData} />;
};

export default HighligtProductCategoryWidget;
