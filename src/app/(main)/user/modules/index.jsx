// -- components
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';
import Menu from '@components/Header/views/menu';

const User = () => {
  return (
    <>
      <Menu data='user' />
      <FallbackPages />
    </>
  );
};

export default User;
