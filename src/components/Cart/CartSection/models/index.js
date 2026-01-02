// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.CART,
    data: payload
  });
};

const cartModel = {
  list: handleList
};

export default cartModel;
