// -- components
import Menu from '@components/Header/views/menu';
import SignUpWidget from '@components/SignUp/Form/widgets/Default';

const SignUp = () => {
  return (
    <>
      <Menu data='sign-up' />
      <SignUpWidget />
    </>
  );
};

export default SignUp;
