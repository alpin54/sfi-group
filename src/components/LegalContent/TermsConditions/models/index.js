// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.TERMS_CONDITIONS
  });
};

const termsConditionsModel = {
  list: handleList
};

export default termsConditionsModel;
