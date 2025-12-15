// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER_BANNER
  });
};

const careerBannerModel = {
  list: handleList
};

export default careerBannerModel;
