// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// -- modules
import NotFound from './not-found/modules';

// -- widgets
import HeaderWidget from '@components/Header/widgets/Default';
import FooterWidget from '@components/Footer/widgets/Default';
import MainSite from '@components/MainSite';

// -- metadata
const metadata = metaTag.dynamic({
  page: 'Not Found',
  link: 'not-found'
});

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// NotFoundPage
// ==================

const NotFoundPage = async () => {
  return (
    <>
      <HeaderWidget />
      <MainSite>
        <NotFound />
      </MainSite>
      <FooterWidget />
    </>
  );
};

export { metadata, schemadata };
export default NotFoundPage;
