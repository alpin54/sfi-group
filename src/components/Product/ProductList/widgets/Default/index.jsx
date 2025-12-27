'use client';

// -- views
import ProductList from '@components/Product/ProductList/views';

// -- data dummy
import data from '@components/Product/ProductList/data';

const ProductListWidget = ({ category, subCategory }) => {
  return (
    <ProductList
      data={data}
      category={category}
      subCategory={subCategory}
      brandOptions={data.brandOptions}
      sortOptions={data.sortOptions}
      colorOptions={data.colorOptions}
      filters={{ data: [], brand: [], color: [], priceRange: [0, 0] }}
      onFilterChange={() => {}}
    />
  );
};

export default ProductListWidget;
