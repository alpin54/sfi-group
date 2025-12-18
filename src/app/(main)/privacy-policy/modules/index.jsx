// -- components
import Menu from '@components/Header/views/menu';
import PrivacyPolicyWidget from '@components/LegalContent/PrivacyPolicy/widgets/Default';

const PrivacyPolicy = () => {
  return (
    <>
      <Menu data='privacy-policy' />
      <PrivacyPolicyWidget />
    </>
  );
};

export default PrivacyPolicy;
