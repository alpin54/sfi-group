// // -- models
// import heroBannerModel from '@components/ModalBanner/models';

// -- views
import ModalBannerView from '@components/ModalBanner/views';

// -- data
import dummyData from '@components/ModalBanner/data';

const ModalBannerWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <ModalBannerView data={dummyData} openInitially={true} />;
};

export default ModalBannerWidget;
