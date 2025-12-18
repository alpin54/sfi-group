// -- models
import ShipingReturnModel from '@components/LegalContent/ShipingReturn/models';

// -- components
import ShipingReturnView from '@components/LegalContent/ShipingReturn/views';

// -- data
import ShipingReturnData from '@components/LegalContent/ShipingReturn/data';

const ShipingReturnWidget = () => {
  // const data = ShipingReturnModel(ShipingReturnData);
  return <ShipingReturnView data={ShipingReturnData} />;
};

export default ShipingReturnWidget;
