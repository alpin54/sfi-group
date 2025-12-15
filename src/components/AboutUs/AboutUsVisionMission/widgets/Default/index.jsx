// -- views
import AboutUsVisionMissionView from '@components/AboutUs/AboutUsVisionMission/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsVisionMission/data';

const AboutUsVisionMissionWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsVisionMissionView data={dummyData} />;
};

export default AboutUsVisionMissionWidget;
