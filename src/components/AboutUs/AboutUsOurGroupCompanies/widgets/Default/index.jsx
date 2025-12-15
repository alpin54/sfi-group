// -- views
import AboutUsOurGroupCompaniesView from '@components/AboutUs/AboutUsOurGroupCompanies/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsOurGroupCompanies/data';

const AboutUsOurGroupCompaniesWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsOurGroupCompaniesView data={dummyData} />;
};

export default AboutUsOurGroupCompaniesWidget;
