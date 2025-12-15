// -- components
import Menu from '@components/Header/views/menu';
import FallbackPages from '@components/FallbackSection/widgets/NotFound';

const NotFound = () => {
  return (
    <>
      <Menu data='not-found' />
      <FallbackPages />
    </>
  );
};

export default NotFound;
