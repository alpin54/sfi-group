// -- utils
import metaTag from '@utils/metaTag';
import schema from '@utils/schema';

// // -- models
// import careerDetailModel from '@components/Career/CareerDetail/models';

// -- modules
import CareerDetail from './modules';

// -- metadata
const generateMetadata = async ({ params }) => {
  const { slug } = params;
  // const { data } = await careerDetailModel.detail(slug);

  return metaTag.dynamic({
    page: 'Career Detail',
    link: `career/${slug}`
  });
};

// -- schemadata
const schemadata = schema.dynamic();

// ==================
// Career Page
// ==================

const CareerDetailPage = async ({ params }) => {
  const { slug } = params;
  return <CareerDetail slug={slug} />;
};

export { generateMetadata, schemadata };
export default CareerDetailPage;
