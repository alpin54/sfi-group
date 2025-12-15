// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HERO_BANNERS
  });
};

const heroBannerModel = {
  list: handleList
};

export default heroBannerModel;
