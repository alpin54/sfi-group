// -- views
import NewProduct from '@components/NewProduct/views';

// -- data
import dummyData from '@components/NewProduct/data';

const NewProductWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <NewProduct data={dummyData} />;
};

export default NewProductWidget;
