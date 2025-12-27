// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PROFILE
  });
};
const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'put',
    url: ENDPOINT.PROFILE,
    data: payload
  });
};

const profileModel = {
  list: handleList,
  submit: handleSubmit
};

export default profileModel;
