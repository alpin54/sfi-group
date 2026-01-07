// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

// -- utils
import CookiesServer from '@utils/cookieServer';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ORDERS,
    headers: {
      Authorization: `Bearer ${CookiesServer.token()}`
    }
  });
};

const myOrdersModel = {
  list: handleList
};

export default myOrdersModel;
