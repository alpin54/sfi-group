'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components
import FaqsWidget from '@components/Faqs/widgets/Default';

const Faqs = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('faqs');
  }, [setMenu]);

  return (
    <>
      <FaqsWidget />
    </>
  );
};

export default Faqs;
