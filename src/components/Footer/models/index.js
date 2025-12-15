// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FOOTER
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.SUBSCRIBE,
    data: payload
  });
};

const footerModel = {
  list: handleList,
  submit: handleSubmit
};

export default footerModel;
