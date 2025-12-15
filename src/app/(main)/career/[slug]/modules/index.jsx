// -- components
import Menu from '@components/Header/views/menu';
import CareerDetailWidget from '@components/Career/CareerDetail/widgets/Default';

const CareerDetail = ({ slug }) => {
  return (
    <>
      <Menu data='career' />
      <CareerDetailWidget slug={slug} />
    </>
  );
};

export default CareerDetail;
