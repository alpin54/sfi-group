// data/regionDummy.js
const DUMMY_PROVINCES = [
  {
    id: 11,
    provinsi_name: 'Aceh',
    cities: [
      {
        id: 1101,
        kabupaten_name: 'Aceh Besar',
        districts: [
          {
            id: 110101,
            kecamatan_name: 'Banda Raya',
            postal_code: '23234',
            subdistricts: [
              { id: 11010101, kelurahan_name: 'Sebelah Timur' },
              { id: 11010102, kelurahan_name: 'Sebelah Barat' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 32,
    provinsi_name: 'West Java',
    cities: [
      {
        id: 3273,
        kabupaten_name: 'Bandung',
        districts: [
          {
            id: 3273010,
            kecamatan_name: 'Bandung Wetan',
            postal_code: '40141',
            subdistricts: [
              { id: 327301001, kelurahan_name: 'Cibeunying Kaler' },
              { id: 327301002, kelurahan_name: 'Tamansari' }
            ]
          }
        ]
      }
    ]
  }
];

export default DUMMY_PROVINCES;
