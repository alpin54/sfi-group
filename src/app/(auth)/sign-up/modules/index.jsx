// -- components
import Menu from '@components/Header/views/menu';
// import SignUpWidget from '@components/SignUp/widgets/Default';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const SignUp = () => {
  return (
    <>
      <Menu data='sign-up' />
      {/* <SignUpWidget /> */}
      <FallbackPages />
    </>
  );
};

export default SignUp;
