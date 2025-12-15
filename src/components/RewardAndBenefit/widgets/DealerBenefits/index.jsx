// -- views
import RewardAndBenefitView from '@components/RewardAndBenefit/views';

// -- data
import dummyData from '@components/RewardAndBenefit/data/dealerBenefitsData';

const DealerBenefitsWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <RewardAndBenefitView data={dummyData} />;
};

export default DealerBenefitsWidget;
