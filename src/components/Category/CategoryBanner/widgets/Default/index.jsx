// -- views
import CategoryBanner from '@components/Category/CategoryBanner/views';

// -- data dummy
import data from '@components/Category/CategoryBanner/data';

const CategoryBannerWidget = ({ category }) => {
  return <CategoryBanner data={data} category={category} />;
};

export default CategoryBannerWidget;
