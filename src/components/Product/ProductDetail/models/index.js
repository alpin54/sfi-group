// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleDetail = async (slug) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.PRODUCTS}/${slug}`
  });
};

const shopProductDetailModel = {
  detail: handleDetail
};

export default shopProductDetailModel;
