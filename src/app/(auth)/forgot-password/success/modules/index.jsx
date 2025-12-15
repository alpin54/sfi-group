// -- components
import Menu from '@components/Header/views/menu';
// import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessSendInstructions';
import FallbackPages from '@components/FallbackSection/widgets/UnderConstruction';

const SuccessSendIntructions = () => {
  return (
    <>
      <Menu menu='success-send-instructions' />
      {/* <AuthSuccessWidget /> */}
      <FallbackPages />
    </>
  );
};

export default SuccessSendIntructions;
