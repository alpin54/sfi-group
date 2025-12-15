// -- views
import FaqsList from '@components/Faqs/views';

// -- dummy
import dummyData from '@components/Faqs/data';

const FaqsListWidget = () => {
  return <FaqsList data={dummyData} />;
};

export default FaqsListWidget;
