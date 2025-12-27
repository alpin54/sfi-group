'use client';

// -- views
import ProductPromo from '@components/Product/ProductPromo/views';

// -- data dummy
import data from '@components/Product/ProductPromo/data';

const ProductPromoWidget = () => {
  return (
    <ProductPromo
      data={data}
      brandOptions={data.brandOptions}
      sortOptions={data.sortOptions}
      colorOptions={data.colorOptions}
      filters={{ data: [], brand: [], color: [], priceRange: [0, 0] }}
      onFilterChange={() => {}}
    />
  );
};

export default ProductPromoWidget;
