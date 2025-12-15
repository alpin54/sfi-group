// -- views
import AboutUsOverviewView from '@components/AboutUs/AboutUsOverview/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsOverview/data';

const AboutUsOverviewWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsOverviewView data={dummyData} />;
};

export default AboutUsOverviewWidget;
