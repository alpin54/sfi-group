// -- components
import RecruitmentProcess from '@components/Career/RecruitmentProcess/views';

// -- dummy data
import dummyData from '@components/Career/RecruitmentProcess/data';

const RecruitmentProcessWidget = async () => {
  return <RecruitmentProcess data={dummyData} />;
};

export default RecruitmentProcessWidget;
