// -- models
import authSuccessModel from '@components/Auth/AuthSuccess/models';

// -- components
import AuthSuccess from '@components/Auth/AuthSuccess/views';

const AuthSuccessWidget = async () => {
  let datas = { images: [], title: '', description: '' };
  let readys = false;

  try {
    const { ready: readyBanner, data: bannerData } = await authSuccessModel.successAccountBanner();
    const { ready: readyAbout, data: aboutData } = await authSuccessModel.successAccountAbout();

    readys = readyBanner && readyAbout;
    datas = {
      images:
        bannerData?.data?.map((item) => ({
          alt: item.title || 'Auth Success Banner',
          image: item.image
        })) || [],
      title: aboutData?.data?.title || '',
      description: aboutData?.data?.description || ''
    };
  } catch (error) {
    console.error('Failed fetch AuthSuccess data:', error);
  }

  return <AuthSuccess ready={readys} data={datas} />;
};

export default AuthSuccessWidget;
