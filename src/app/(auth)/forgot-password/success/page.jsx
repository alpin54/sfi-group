// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import SuccessSendIntructions from './modules';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Success Send Instructions',
  link: 'forgot-password/success'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// SuccessSendIntructionsPage
// ==================

const SuccessSendIntructionsPage = async () => {
  return <SuccessSendIntructions />;
};

export { metadata, schemadata };
export default SuccessSendIntructionsPage;
