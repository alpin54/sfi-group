// -- components
import Menu from '@components/Header/views/menu';
import AuthSuccessWidget from '@components/Auth/AuthSuccess/widgets/SuccessSendInstructions';

const SuccessSendIntructions = () => {
  return (
    <>
      <Menu menu='success-send-instructions' />
      <AuthSuccessWidget />
    </>
  );
};

export default SuccessSendIntructions;
