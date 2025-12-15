// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleListNotFound = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.NOTFOUND
  });
};

const handleListMaintenance = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.MAINTENANCE
  });
};

const fallbackModel = {
  notfound: handleListNotFound,
  maintenance: handleListMaintenance
};

export default fallbackModel;
