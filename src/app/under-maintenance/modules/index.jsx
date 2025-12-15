'use client';

// -- library
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components
import FallbackPagesWidget from '@components/FallbackSection/widgets/UnderConstruction';

const Katalog = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('under-maintenance');
  }, [setMenu]);

  return (
    <>
      <FallbackPagesWidget />
    </>
  );
};

export default Katalog;
