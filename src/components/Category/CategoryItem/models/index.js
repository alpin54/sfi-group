// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER
  });
};

const handleCareerEmpty = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.CAREER_EMPTY
  });
};

const careerModel = {
  list: handleList,
  empty: handleCareerEmpty
};

export default careerModel;
