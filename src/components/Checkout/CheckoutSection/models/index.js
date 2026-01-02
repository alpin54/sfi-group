// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleDetail = async (slug) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.ORDER}/${slug}`
  });
};

const orderModel = {
  detail: handleDetail
};

export default orderModel;
