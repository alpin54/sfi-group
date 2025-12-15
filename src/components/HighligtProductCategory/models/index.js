// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HOME_BANNER
  });
};

const heroBannerModel = {
  list: handleList
};

export default heroBannerModel;
