// -- components
import CareerTitle from '@components/Career/CareerTitle/views';

// -- dummy data
import dummyData from '@components/Career/CareerTitle/data';

const CareerTitleWidget = async () => {
  return <CareerTitle data={dummyData} />;
};

export default CareerTitleWidget;
