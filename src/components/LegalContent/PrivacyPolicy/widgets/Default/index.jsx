// -- components
import PrivacyPolicyView from '@components/LegalContent/PrivacyPolicy/views';

// -- data dummy
import privacyPolicyData from '@components/LegalContent/PrivacyPolicy/data';

const PrivacyPolicyWidget = () => {
  return <PrivacyPolicyView data={privacyPolicyData} />;
};

export default PrivacyPolicyWidget;
