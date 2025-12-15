// -- components
import Menu from '@components/Header/views/menu';
import TermsConditionsContentWidget from '@components/LegalContent/TermsConditions/widgets/Default';

const TermsConditions = () => {
  return (
    <>
      <Menu data='terms-conditions' />
      <TermsConditionsContentWidget />
    </>
  );
};

export default TermsConditions;
