// -- views
import AboutUsOurBranchesView from '@components/AboutUs/AboutUsOurBranches/views';

// -- data
import dummyData from '@components/AboutUs/AboutUsOurBranches/data';

const AboutUsOurBranchesWidget = async () => {
  // const { data } = await heroBannerModel.list();

  return <AboutUsOurBranchesView data={dummyData} />;
};

export default AboutUsOurBranchesWidget;
