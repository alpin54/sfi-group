// -- views
import AboutUsGalleryView from '@components/AboutUs/AboutUsGallery/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsGallery/data';

const AboutUsGalleryWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsGalleryView data={dummyData} />;
};

export default AboutUsGalleryWidget;
