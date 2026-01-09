'use client';
// -- libraries
import { useState } from 'react';

// -- styles
import style from '@components/Account/MyAddress/styles/style.module.scss';
// import addressModel from '@components/Account/MyAddress/models'; // Integrasi API: comment dulu

// -- assets
import ImgEmpty from '@assets/image/dummy/map-empty.svg';

// -- elements
import Button from '@elements/Button/views';
import SystemIcon from '@elements/SystemIcon/views';
import Empty from '@elements/Empty/views';
import Modal from '@elements/Modal/views';

// -- components
import MyAddressModalWidget from '@components/Account/MyAddressModal/widgets/Default';

const MyAddressView = (props) => {
  const { data, provinces } = props;

  // gunakan dummy data, integrasi API: comment dulu
  const [addresses, setAddresses] = useState(data || []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMethod, setDrawerMethod] = useState('add');
  const [currentEdit, setCurrentEdit] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // const handleSetPrimary = async (address) => {
  //   const payload = { id: address.id };
  //   await addressModel.setDefault(payload);
  //   const newList = await addressModel.list();
  //   const datas = newList?.data?.data || [];
  //   setAddresses(datas);
  // };

  // Dummy version
  const handleSetPrimary = (address) => {
    // replace logic to dummy setter
    setAddresses((prev) =>
      prev.map((a) => (a.id === address.id ? { ...a, is_default: true } : { ...a, is_default: false }))
    );
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleOpenAdd = () => {
    setDrawerMethod('add');
    setCurrentEdit(null);
    setDrawerOpen(true);
  };
  const handleOpenEdit = (addr) => {
    setDrawerMethod('edit');
    setCurrentEdit(addr);
    setDrawerOpen(true);
  };
  // const handleRefresh = async () => {
  //   const resp = await addressModel.list();
  //   const datas = resp?.data?.data || [];
  //   setAddresses(datas);
  //   setDrawerOpen(false);
  //   setCurrentEdit(null);
  // };
  // Dummy version
  const handleRefresh = () => {
    setDrawerOpen(false);
    setCurrentEdit(null);
    // Silakan trigger refresh jika sudah integrasi
  };

  return (
    <div className={style.myaddress}>
      {addresses.length === 0 ? (
        <div className={style.empty}>
          <Empty
            image={ImgEmpty}
            title='Oops, you haven’t added any address.'
            description='Let’s add one so we know where to send your orders!'
            action={
              <Button onClick={handleOpenAdd} icon='add'>
                Add New Address
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <div className={style.headerButton}>
            <Button variant='outlined' onClick={handleOpenAdd} icon='add'>
              Add New Address
            </Button>
          </div>
          <div className={style.list}>
            {addresses.map((addr) => (
              <div key={addr.id} className={addr.is_default ? style.itemBoxPrimary : style.itemBox}>
                <div className={style.itemHeader}>
                  <div className={style.itemLabel}>
                    <div className={style.labelTag}>
                      <SystemIcon name='tag' size={16} />
                      <span>{addr.label}</span>
                    </div>
                    {addr.is_default && <span className={style.defaultTag}>• Default</span>}
                  </div>
                </div>
                <div className={style.itemList}>
                  <SystemIcon name='user-circle-dashed' size={15} />
                  <span className={style.profileName}>{addr.recipient_name}</span>
                </div>
                <div className={style.itemList}>
                  <SystemIcon name='phone-fill' size={15} />
                  <span className={style.profilePhone}>{addr.phone}</span>
                </div>
                <div className={style.itemList}>
                  <SystemIcon name='map-pin-fill' size={15} />
                  <span>
                    {addr.province_name}, {addr.city_name}, {addr.district_name}, {addr.subdistrict_name},{' '}
                    {addr.address}, {addr.postal_code}
                  </span>
                </div>
                <div className={style.itemActions}>
                  <Button className={style.actionBtn} onClick={() => handleOpenEdit(addr)}>
                    Edit Address
                  </Button>
                  <Button className={style.actionBtn} variant='outlined' onClick={() => setConfirmDeleteId(addr.id)}>
                    Delete
                  </Button>
                  {!addr.is_default && (
                    <Button className={style.actionBtn} variant='outlined' onClick={() => handleSetPrimary(addr)}>
                      Set as Primary
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Modal Widget */}
      <MyAddressModalWidget
        open={drawerOpen}
        method={drawerMethod}
        initialValue={currentEdit}
        provinces={provinces}
        onClose={() => setDrawerOpen(false)}
        onSuccess={handleRefresh}
      />
      {/* Confirm Delete Modal */}
      {confirmDeleteId && (
        <Modal
          open={!!confirmDeleteId}
          onClose={() => setConfirmDeleteId(null)}
          title='Konfirmasi Hapus'
          size='small'
          variant='default'>
          <div className={style.confirmBody}>
            <div className={style.confirmText}>Apakah Anda yakin ingin menghapus alamat ini?</div>
            <div className={style.confirmActions}>
              <Button variant='outlined' onClick={() => setConfirmDeleteId(null)}>
                Batal
              </Button>
              <Button
                variant='solid'
                onClick={() => {
                  setAddresses((prev) => prev.filter((a) => a.id !== confirmDeleteId));
                  setConfirmDeleteId(null);
                }}>
                Hapus
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyAddressView;
