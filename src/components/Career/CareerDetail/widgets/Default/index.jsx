// -- models
import careerDetailModel from '@components/Career/CareerDetail/models';

// -- components
import CareerDetail from '@components/Career/CareerDetail/views';

// -- data
// import dummyData from '@components/Career/CareerDetail/data';

const CareerDetailWidget = async ({ slug }) => {
  const { data } = await careerDetailModel.detail(slug);

  return <CareerDetail data={data.data} />;
};

export default CareerDetailWidget;
