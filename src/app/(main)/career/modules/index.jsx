// -- components
import CareerTitleWidget from '@components/Career/CareerTitle/widgets/Default';
import CareerBannerWidget from '@components/Career/CareerBanner/widgets/Default';
import CareerBenefitWidget from '@components/Career/CareerBenefit/widgets/Default';
import RecruitmentProcessWidget from '@components/Career/RecruitmentProcess/widgets/Default';
import CareerListWidget from '@components/Career/CareerList/widgets/Default';

// -- Men
import Menu from '@components/Header/views/menu';

const Career = () => {
  return (
    <>
      <Menu data='home' />
      <CareerTitleWidget />
      <CareerBannerWidget />
      <CareerBenefitWidget />
      <RecruitmentProcessWidget />
      <CareerListWidget />
    </>
  );
};

export default Career;
