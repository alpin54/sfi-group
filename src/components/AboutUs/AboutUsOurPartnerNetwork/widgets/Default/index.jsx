// -- views
import AboutUsOurPartnerNetworkView from '@components/AboutUs/AboutUsOurPartnerNetwork/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsOurPartnerNetwork/data';

const AboutUsOurPartnerNetworkWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsOurPartnerNetworkView data={dummyData} />;
};

export default AboutUsOurPartnerNetworkWidget;
