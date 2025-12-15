// -- components
import Menu from '@components/Header/views/menu';
import SignInWidget from '@components/SignIn/SignInMain/widgets/Default';

const SignIn = () => {
  return (
    <>
      <Menu data='sign-in' />
      <SignInWidget />
    </>
  );
};

export default SignIn;
