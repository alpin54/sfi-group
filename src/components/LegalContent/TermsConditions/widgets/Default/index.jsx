// -- components
import TermsConditionsView from '@components/LegalContent/TermsConditions/views';

// -- data dummy
import termsConditionsData from '@components/LegalContent/TermsConditions/data';

const TermsConditionsWidget = () => {
  return <TermsConditionsView data={termsConditionsData} />;
};

export default TermsConditionsWidget;
