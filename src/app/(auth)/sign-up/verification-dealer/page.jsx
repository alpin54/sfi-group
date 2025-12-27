// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import VerificationDealer from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Verification Dealer',
  link: 'sign-up/verification-dealer'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// VerifyEmailPage
// ==================

const VerificationDealerPage = async () => {
  return <VerificationDealer />;
};

export { metadata, schemadata };
export default VerificationDealerPage;
