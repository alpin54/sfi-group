// -- views
import AboutUsStoryView from '@components/AboutUs/AboutUsStory/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsStory/data';

const AboutUsStoryWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsStoryView data={dummyData} />;
};

export default AboutUsStoryWidget;
