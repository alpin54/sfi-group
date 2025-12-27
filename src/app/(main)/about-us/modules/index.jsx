// -- components
import Menu from '@components/Header/views/menu';
import AboutUsOverview from '@components/AboutUs/AboutUsOverview/widgets/Default';
import AboutUsVisionMission from '@components/AboutUs/AboutUsVisionMission/widgets/Default';
import AboutUsStory from '@components/AboutUs/AboutUsStory/widgets/Default';
import AboutUsOurGroupCompanies from '@components/AboutUs/AboutUsOurGroupCompanies/widgets/Default';
import AboutUsOurBranches from '@components/AboutUs/AboutUsOurBranches/widgets/Default';
import AboutUsOurPartnerNetwork from '@components/AboutUs/AboutUsOurPartnerNetwork/widgets/Default';
import AboutUsGallery from '@components/AboutUs/AboutUsGallery/widgets/Default';
import ScrollReveal from '@components/ScrollReveal/views';

const AboutUs = () => {
  return (
    <>
      <Menu data='about-us' />
      <ScrollReveal direction='up'>
        <AboutUsOverview />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsVisionMission />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsStory />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsOurGroupCompanies />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsOurBranches />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsOurPartnerNetwork />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <AboutUsGallery />
      </ScrollReveal>
    </>
  );
};

export default AboutUs;
