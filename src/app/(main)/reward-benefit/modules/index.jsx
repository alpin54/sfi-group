// -- components
import Menu from '@components/Header/views/menu';
import MemberRewardPoints from '@components/RewardAndBenefit/widgets/MemberRewardPoints';
import DealerBenefits from '@components/RewardAndBenefit/widgets/DealerBenefits';

const RewardAndBenefit = () => {
  return (
    <>
      <Menu data='reward-and-benefit' />
      <MemberRewardPoints />
      <DealerBenefits />
    </>
  );
};

export default RewardAndBenefit;
