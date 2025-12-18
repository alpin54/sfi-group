// -- models
// import resetPasswordModel from '@components/ResetPassword/models';

// -- components
import ResetPassword from '@components/ResetPassword/Form/views';

// -- data dummy
import dataDummy from '@components/ResetPassword/Form/data';

const ResetPasswordWidget = ({ customerId, token }) => {
  // let finalData = { images: [], title: '', description: '' };

  // try {
  //   const { data: bannerApi } = await resetPasswordModel.listBanner();
  //   const { data: aboutApi } = await resetPasswordModel.listAbout();

  //   finalData = {
  //     images:
  //       bannerApi?.data?.map((i) => ({
  //         alt: i.title || 'Reset Password Banner',
  //         image: i.image
  //       })) || [],

  //     title: aboutApi?.data?.title || '',
  //     description: aboutApi?.data?.description || ''
  //   };
  // } catch (error) {
  //   console.error('Fetch forgot password failed:', error);
  // }
  return <ResetPassword customerId={customerId} token={token} data={dataDummy} />;
};

export default ResetPasswordWidget;
