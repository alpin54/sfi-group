// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleDetail = async (slug) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.CAREER}/${slug}`
  });
};

const handleSubmit = async (payload) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const careerDetailModel = {
  detail: handleDetail,
  submit: handleSubmit
};

export default careerDetailModel;
