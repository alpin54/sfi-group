// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import RewardAndBenefit from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Reward & Benefit',
  link: 'reward-and-benefit'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// RewardAndBenefitPage
// ==================

const RewardAndBenefitPage = async () => {
  return <RewardAndBenefit />;
};

export { metadata, schemadata };
export default RewardAndBenefitPage;
