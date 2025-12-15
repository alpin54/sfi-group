// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleListBanner = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOT_PASSWORD_BANNER
  });
};
const handleListAbout = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOT_PASSWORD_ABOUT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.FORGOT_PASSWORD,
    data: payload
  });
};

const forgotPasswordModel = {
  listBanner: handleListBanner,
  listAbout: handleListAbout,
  submit: handleSubmit
};

export default forgotPasswordModel;
