// -- components
import ProductReviewView from '@components/Product/ProductReview/views';

// -- dummy
import dummyData from '@components/Product/ProductReview/data';

const ProductReviewWidget = (props) => {
  return <ProductReviewView {...props} data={dummyData} />;
};

export default ProductReviewWidget;
