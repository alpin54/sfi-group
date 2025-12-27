// -- components
import CareerTitleWidget from '@components/Career/CareerTitle/widgets/Default';
import CareerBannerWidget from '@components/Career/CareerBanner/widgets/Default';
import CareerBenefitWidget from '@components/Career/CareerBenefit/widgets/Default';
import RecruitmentProcessWidget from '@components/Career/RecruitmentProcess/widgets/Default';
import CareerListWidget from '@components/Career/CareerList/widgets/Default';
import ScrollReveal from '@components/ScrollReveal/views';

// -- Men
import Menu from '@components/Header/views/menu';

const Career = () => {
  return (
    <>
      <Menu data='home' />
      <ScrollReveal direction='up'>
        <CareerTitleWidget />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <CareerBannerWidget />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <CareerBenefitWidget />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <RecruitmentProcessWidget />
      </ScrollReveal>
      <ScrollReveal direction='up'>
        <CareerListWidget />
      </ScrollReveal>
    </>
  );
};

export default Career;
