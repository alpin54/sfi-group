// -- components
import CtaWidget from '@components/Cta/widgets/Default';
import ModalBannerWidget from '@components/ModalBanner/widgets/Default';
import HeroBannerWidget from '@components/HeroBanner/widgets/Default';
import HighligtProductCategory from '@components/HighligtProductCategory/widgets/Default';
import NewProductWidget from '@components/NewProduct/widgets/Default';
import SectionBrandWidget from '@components/SectionBrand/widgets/Default';
import VideoSectionWidget from '@components/VideoSection/widgets/Default';
import ProductPopularWidget from '@components/Product/ProductPopular/widgets/Default';
import ScrollReveal from '@components/ScrollReveal/views';

// -- Men
import Menu from '@components/Header/views/menu';

const Home = () => {
  return (
    <>
      <Menu data='home' />
      {/* Modal Banner */}
      <ModalBannerWidget />
      {/* Call to Action */}
      <CtaWidget />
      {/* Hero Banner */}
      <HeroBannerWidget />
      {/* Highlight Product Category */}
      <HighligtProductCategory />
      {/* New Product */}
      <ScrollReveal direction='up'>
        <NewProductWidget />
      </ScrollReveal>
      {/* Popular Product */}
      <ScrollReveal direction='up'>
        <ProductPopularWidget />
      </ScrollReveal>
      {/* Brand */}
      <ScrollReveal direction='up'>
        <SectionBrandWidget />
      </ScrollReveal>
      {/* Video Section */}
      <ScrollReveal direction='up'>
        <VideoSectionWidget />
      </ScrollReveal>
    </>
  );
};

export default Home;
