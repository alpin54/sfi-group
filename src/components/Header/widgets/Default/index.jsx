// -- organisms
import Header from '@components/Header/views';

// -- data
import dummyData from '@components/Header/data';

const HeaderWidget = () => {
  return (
    <Header
      data={dummyData.menu}
      newArrivals={dummyData.newArrivals}
      popularProducts={dummyData.popularProducts}
      popularBrands={dummyData.popularBrands}
    />
  );
};

export default HeaderWidget;
