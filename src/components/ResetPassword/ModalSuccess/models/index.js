// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.LOGIN,
    data: payload
  });
};

const signInModel = {
  submit: handleSubmit
};

export default signInModel;
