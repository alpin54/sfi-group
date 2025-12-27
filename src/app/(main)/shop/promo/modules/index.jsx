'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components
import ProductPromo from '@components/Product/ProductPromo/widgets/Default';

const Promo = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('promo');
  }, [setMenu]);

  return (
    <>
      <ProductPromo />
    </>
  );
};

export default Promo;
