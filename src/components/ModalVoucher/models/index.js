// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleList = async (data) => {
  return await httpRequest({
    method: 'post',
    url: ENDPOINT.VOUCHERS,
    data: data
  });
};

const voucherModel = {
  list: handleList
};

export default voucherModel;
