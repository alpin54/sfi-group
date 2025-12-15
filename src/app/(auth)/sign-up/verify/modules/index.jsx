'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components
// import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessVerifyEmail';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const VerifyEmail = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('success-verify-email');
  }, [setMenu]);

  return (
    <>
      {/* <AuthSuccessWidget /> */}
      <FallbackPages />
    </>
  );
};

export default VerifyEmail;
