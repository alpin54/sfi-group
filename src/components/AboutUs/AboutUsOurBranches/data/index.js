// -- assets
import maps from '@assets/image/dummy/wr-maps.svg';

const data = {
  title: 'Our Branches',
  image: maps,
  geoUrl: '/maps/indonesia-province-simple.json',
  branches: [
    {
      id: 'jakarta',
      name: 'Jakarta',
      lat: -6.175392,
      lng: 106.827153,
      address: 'Rukan Exclusive D/21, Jl. Marina Raya, PIK, Jakarta'
    },
    {
      id: 'bali',
      name: 'Bali',
      lat: -8.409518,
      lng: 115.188919,
      address: 'Pertokoan Agung raya blok 12 Jl. Teuku umar 200 denpasar'
    }
  ]
};

export default data;
