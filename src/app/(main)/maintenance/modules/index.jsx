// -- components
import FallbackPages from '@components/FallbackSection/widgets/Maintenance';
import Menu from '@components/Header/views/menu';

const Maintenance = () => {
  return (
    <>
      <Menu data='maintenance' />
      <FallbackPages />
    </>
  );
};

export default Maintenance;
