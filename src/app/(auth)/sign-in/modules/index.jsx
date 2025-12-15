// -- components
import Menu from '@components/Header/views/menu';
// import SignInWidget from '@components/SignIn/SignInMain/widgets/Default';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const SignIn = () => {
  return (
    <>
      <Menu data='sign-in' />
      {/* <SignInWidget /> */}
      <FallbackPages />
    </>
  );
};

export default SignIn;
