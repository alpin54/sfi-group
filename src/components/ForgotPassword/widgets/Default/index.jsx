// -- models
// import forgotPasswordModel from '@components/ForgotPassword/models';

// -- components
import ForgotPassword from '@components/ForgotPassword/views';

// -- data dummy
import dataDummy from '@components/ForgotPassword/data';

const ForgotPasswordWidget = () => {
  // let finalData = { images: [], title: '', description: '' };

  // try {
  //   const { data: bannerApi } = await forgotPasswordModel.listBanner();
  //   const { data: aboutApi } = await forgotPasswordModel.listAbout();

  //   finalData = {
  //     images:
  //       bannerApi?.data?.map((i) => ({
  //         alt: i.title || 'Forgot Password Banner',
  //         image: i.image
  //       })) || [],

  //     title: aboutApi?.data?.title || '',
  //     description: aboutApi?.data?.description || ''
  //   };
  // } catch (error) {
  //   console.error('Fetch forgot password failed:', error);
  // }

  return <ForgotPassword ready={true} data={dataDummy} error={null} />;
};

export default ForgotPasswordWidget;
