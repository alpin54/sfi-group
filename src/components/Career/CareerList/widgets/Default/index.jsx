// -- views
import CareerList from '@components/Career/CareerList/views';

// -- dummy data
import data from '@components/Career/CareerList/data';

const CareerListWidget = async () => {
  return <CareerList data={data} />;
};

export default CareerListWidget;
