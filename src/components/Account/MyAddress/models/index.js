// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.ADDRESS
  });
};

const handleProvince = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PROVINCES
  });
};

const handleSetDefault = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.ADDRESS_DEFAULT,
    data: payload
  });
};

const addressModel = {
  list: handleList,
  province: handleProvince,
  setDefault: handleSetDefault
};

export default addressModel;
