// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

const handleCities = async (province_id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.CITIES}/${province_id}`
  });
};

const handleDistricts = async (city_id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.DISTRICTS}/${city_id}`
  });
};

const handleSubdistricts = async (district_id) => {
  return await httpRequest({
    method: 'get',
    url: `${ENDPOINT.SUBDISTRICTS}/${district_id}`
  });
};

const handleSubmit = async (payload, method) => {
  return await httpRequest({
    method: method,
    url: ENDPOINT.ADDRESS,
    data: payload
  });
};

const addressDrawerModel = {
  cities: handleCities,
  districts: handleDistricts,
  subdistricts: handleSubdistricts,
  submit: handleSubmit
};

export default addressDrawerModel;
