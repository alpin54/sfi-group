// -- components
import CareerBenefit from '@components/Career/CareerBenefit/views';

// -- dummy data
import dummyData from '@components/Career/CareerBenefit/data';

const CareerBenefitWidget = async () => {
  return <CareerBenefit data={dummyData} />;
};

export default CareerBenefitWidget;
