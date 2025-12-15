// -- components
import CtaWidget from '@components/Cta/widgets/Default';
import ModalBannerWidget from '@components/ModalBanner/widgets/Default';
import HeroBannerWidget from '@components/HeroBanner/widgets/Default';
import HighligtProductCategory from '@components/HighligtProductCategory/widgets/Default';
import NewProductWidget from '@components/NewProduct/widgets/Default';
import SectionBrandWidget from '@components/SectionBrand/widgets/Default';
import VideoSectionWidget from '@components/VideoSection/widgets/Default';
import ProductPopularWidget from '@components/Product/ProductPopular/widgets/Default';

// -- Men
import Menu from '@components/Header/views/menu';

const Home = () => {
  return (
    <>
      <Menu data='home' />
      <ModalBannerWidget />
      <CtaWidget />
      <HeroBannerWidget />
      <HighligtProductCategory />
      <NewProductWidget />
      <ProductPopularWidget />
      <SectionBrandWidget />
      <VideoSectionWidget />
    </>
  );
};

export default Home;
