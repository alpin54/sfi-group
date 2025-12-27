// -- components
import Menu from '@components/Header/views/menu';
import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessUploadDocument';

const SuccessUploadDocument = () => {
  return (
    <>
      <Menu data='success-upload-document' />
      <AuthSuccessWidget />
    </>
  );
};

export default SuccessUploadDocument;
