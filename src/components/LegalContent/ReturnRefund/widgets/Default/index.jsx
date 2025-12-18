// -- components
import ReturnRefundView from '@components/LegalContent/ReturnRefund/views';

// -- data dummy
import returnRefundData from '@components/LegalContent/ReturnRefund/data';

const ReturnRefundWidget = () => {
  return <ReturnRefundView data={returnRefundData} />;
};

export default ReturnRefundWidget;
