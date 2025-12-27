'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components
import VerificationDealerWidget from '@components/SignUp/VerificationDealer/widgets/Default';

const VerificationDealer = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('verification-dealer');
  }, [setMenu]);

  return (
    <>
      <VerificationDealerWidget />
    </>
  );
};

export default VerificationDealer;
