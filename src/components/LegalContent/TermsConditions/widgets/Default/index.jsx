// -- models
import termsConditionsModel from '@components/LegalContent/TermsConditions/models';

// -- components
import TermsConditionsView from '@components/LegalContent/TermsConditions/views';

// -- data
import termsConditionsData from '@components/LegalContent/TermsConditions/data';

const TermsConditionsWidget = async () => {
  const { data } = await termsConditionsModel.list();
  return <TermsConditionsView data={data?.data} />;
};

export default TermsConditionsWidget;
