// -- api
import httpRequest from '@api/httpRequest';
import ENDPOINT from '@api/endPoint';

// -- success create account banner
const handleSuccessAccountBanner = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUCCESS_CREATE_ACCOUNT_BANNER
  });
};

// -- success create account about
const handleSuccessAccountAbout = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.SUCCESS_CREATE_ACCOUNT_ABOUT
  });
};

// -- sucess forgot password instructions
const handleSendInstructionBanner = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOT_PASSWORD_INSTRUCTIONS_BANNER
  });
};
const handleSendInstructionAbout = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.FORGOT_PASSWORD_INSTRUCTIONS_ABOUT
  });
};

// -- success reset password
const handleResetPasswordBanner = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.RESET_PASSWORD_SUCCESS_BANNER
  });
};

// -- success reset password about
const handleResetPasswordAbout = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.RESET_PASSWORD_SUCCESS_ABOUT
  });
};

// -- verification email banner
const handleVerificationEmailBanner = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.VERIFICATION_EMAIL_BANNER
  });
};

// -- verification email about
const handleVerificationEmailAbout = async () => {
  return await httpRequest({
    method: 'get',
    url: ENDPOINT.VERIFICATION_EMAIL_ABOUT
  });
};

const authSuccessModel = {
  sendInstructionBanner: handleSendInstructionBanner,
  sendInstructionAbout: handleSendInstructionAbout,
  resetPasswordBanner: handleResetPasswordBanner,
  resetPasswordAbout: handleResetPasswordAbout,
  successAccountBanner: handleSuccessAccountBanner,
  successAccountAbout: handleSuccessAccountAbout,
  verificationEmailBanner: handleVerificationEmailBanner,
  verificationEmailAbout: handleVerificationEmailAbout
};

export default authSuccessModel;
