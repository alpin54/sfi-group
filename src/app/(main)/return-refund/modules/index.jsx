// -- components
import Menu from '@components/Header/views/menu';
import ReturnRefundWidget from '@components/LegalContent/ReturnRefund/widgets/Default';

const ReturnRefund = () => {
  return (
    <>
      <Menu data='return-refund' />
      <ReturnRefundWidget />
    </>
  );
};

export default ReturnRefund;
