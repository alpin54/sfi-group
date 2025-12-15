// -- components
import Menu from '@components/Header/views/menu';
import AboutUsOverview from '@components/AboutUs/AboutUsOverview/widgets/Default';
import AboutUsVisionMission from '@components/AboutUs/AboutUsVisionMission/widgets/Default';
import AboutUsStory from '@components/AboutUs/AboutUsStory/widgets/Default';
import AboutUsOurGroupCompanies from '@components/AboutUs/AboutUsOurGroupCompanies/widgets/Default';
import AboutUsOurBranches from '@components/AboutUs/AboutUsOurBranches/widgets/Default';
import AboutUsOurPartnerNetwork from '@components/AboutUs/AboutUsOurPartnerNetwork/widgets/Default';
import AboutUsGallery from '@components/AboutUs/AboutUsGallery/widgets/Default';

const AboutUs = () => {
  return (
    <>
      <Menu data='about-us' />
      <AboutUsOverview />
      <AboutUsVisionMission />
      <AboutUsStory />
      <AboutUsOurGroupCompanies />
      <AboutUsOurBranches />
      <AboutUsOurPartnerNetwork />
      <AboutUsGallery />
    </>
  );
};

export default AboutUs;
