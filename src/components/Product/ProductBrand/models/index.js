// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_FEATURED_PRODUCTS
  });
};

const productHomeModel = {
  list: handleList
};

export default productHomeModel;