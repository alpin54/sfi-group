// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ABOUT_ADVANTAGES
  });
};

const aboutUsAdvantagesModel = {
  list: handleList
};

export default aboutUsAdvantagesModel;
