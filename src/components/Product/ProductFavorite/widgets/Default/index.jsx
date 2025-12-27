'use client';

// -- views
import ProductFavorite from '@components/Product/ProductFavorite/views';

// -- data dummy
import data from '@components/Product/ProductFavorite/data';

const ProductFavoriteWidget = () => {
  return <ProductFavorite data={data} />;
};

export default ProductFavoriteWidget;
