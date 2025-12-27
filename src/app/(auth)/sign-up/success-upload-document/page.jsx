// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessUploadDocument from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Success Upload Document',
  link: 'sign-up/success-upload-document'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessUploadDocumentPage
// ==================

const SuccessUploadDocumentPage = async () => {
  return <SuccessUploadDocument />;
};

export { metadata, schemadata };
export default SuccessUploadDocumentPage;
