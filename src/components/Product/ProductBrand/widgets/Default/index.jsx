'use client';

// -- views
import ProductPromo from '@components/Product/ProductBrand/views';

// -- data dummy
import data from '@components/Product/ProductBrand/data';

const ProductPromoWidget = ({ slug }) => {
  return (
    <ProductPromo
      data={data}
      brandOptions={data.brandOptions}
      sortOptions={data.sortOptions}
      colorOptions={data.colorOptions}
      filters={{ data: [], brand: [], color: [], priceRange: [0, 0] }}
      onFilterChange={() => {}}
      slug={slug}
    />
  );
};

export default ProductPromoWidget;
