// -- views
import FallbackPages from '@components/FallbackSection/views';

// -- data
import data from '@components/FallbackSection/data/internalServerErrorData';

const FallbackPagesWidget = () => {
  return <FallbackPages {...data} />;
};

export default FallbackPagesWidget;
