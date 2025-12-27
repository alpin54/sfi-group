// -- components
import Menu from '@components/Header/views/menu';

import CategoryBannerWidget from '@components/Category/CategoryBanner/widgets/Default';
import CategoryItemWidget from '@components/Category/CategoryItem/widgets/Default';

const ShopCategory = ({ category }) => {
  return (
    <>
      <Menu data='shop' />
      <CategoryBannerWidget category={category} />
      <CategoryItemWidget category={category} />
    </>
  );
};

export default ShopCategory;
