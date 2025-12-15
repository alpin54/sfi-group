// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.HEADER
  });
};

const handleSearch = async (keyword) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCTS,
    params: {
      keyword
    }
  });
};

const handlePopular = async (keyword) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCTS_POPULAR,
    params: {
      keyword
    }
  });
};

const handleTrending = async (keyword) => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.PRODUCTS_TRENDING,
    params: {
      keyword
    }
  });
};

const headerModel = {
  list: handleList,
  search: handleSearch,
  popular: handlePopular,
  trending: handleTrending
};

export default headerModel;
