// -- components
import CareerDetail from '@components/Career/CareerDetail/views';

// -- data
import dummyData from '@components/Career/CareerDetail/data';

const CareerDetailWidget = async ({ slug }) => {
  return <CareerDetail data={dummyData} />;
};

export default CareerDetailWidget;
