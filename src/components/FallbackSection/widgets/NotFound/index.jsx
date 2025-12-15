// -- models
import fallbackModel from '@components/FallbackSection/models';

// -- views
import FallbackPages from '@components/FallbackSection/views';

// -- data
import dummy from '@components/FallbackSection/data/notFoundData';

const FallbackPagesWidget = async () => {
  // const { data } = await fallbackModel.notfound();
  return <FallbackPages {...dummy} />;
};

export default FallbackPagesWidget;
