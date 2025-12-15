// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.REGISTER,
    data: payload
  });
};

const signUpModel = {
  submit: handleSubmit
};

export default signUpModel;
