// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleDefault = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.META
  });
};

const metaModel = {
  default: handleDefault
};

export default metaModel;
