'use client';

// -- libraries
import { useEffect } from 'react';

// -- states
import useStateHeader from '@components/Header/states';

// -- components

import ProductFavoriteWidget from '@components/Product/ProductFavorite/widgets/Default';

const Favorite = () => {
  // set menu
  const { setMenu } = useStateHeader();

  useEffect(() => {
    setMenu('favorite');
  }, [setMenu]);

  return (
    <>
      <ProductFavoriteWidget />
    </>
  );
};

export default Favorite;
