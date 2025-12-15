// -- views
import RewardAndBenefitView from '@components/RewardAndBenefit/views';

// -- data
import dummyData from '@components/RewardAndBenefit/data/memberRewardPointsData';

const MemberRewardPointsWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <RewardAndBenefitView data={dummyData} />;
};

export default MemberRewardPointsWidget;
