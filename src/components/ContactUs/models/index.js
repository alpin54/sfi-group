// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CONTACT
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.CONTACT_MESSAGE,
    data: payload
  });
};

const contactModel = {
  list: handleList,
  submit: handleSubmit
};

export default contactModel;
