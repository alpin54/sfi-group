const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ENDPOINT = {
  // AUTHENTICATION
  REGISTER: `${API_URL}/register`,
  LOGIN: `${API_URL}/login`,
  FORGOT_PASSWORD: `${API_URL}/forgot-password`,
  FORGOT_PASSWORD_BANNER: `${API_URL}/forgot-password/banner`,
  FORGOT_PASSWORD_ABOUT: `${API_URL}/forgot-password/about`,
  FORGOT_PASSWORD_INSTRUCTIONS_BANNER: `${API_URL}/send-intructions/banner`,
  FORGOT_PASSWORD_INSTRUCTIONS_ABOUT: `${API_URL}/send-intructions/about`,
  RESET_PASSWORD: `${API_URL}/reset-password`,
  RESET_PASSWORD_BANNER: `${API_URL}/reset-password/banner`,
  RESET_PASSWORD_ABOUT: `${API_URL}/reset-password/about`,
  RESET_PASSWORD_SUCCESS_BANNER: `${API_URL}/success-reset-password/banner`,
  RESET_PASSWORD_SUCCESS_ABOUT: `${API_URL}/success-reset-password/about`,
  SUCCESS_CREATE_ACCOUNT_BANNER: `${API_URL}/success-create/banner`,
  SUCCESS_CREATE_ACCOUNT_ABOUT: `${API_URL}/success-create/about`,
  VERIFICATION_EMAIL_BANNER: `${API_URL}/verification-email/banner`,
  VERIFICATION_EMAIL_ABOUT: `${API_URL}/verification-email/about`,

  // HEADER
  HEADER: `${API_URL}/header`,
  FOOTER: `${API_URL}/footer`,

  // LEGAL PAGES
  TERMS_CONDITIONS: `${API_URL}/terms-conditions`,
  SHIPPING_RETURN: `${API_URL}/shipping-return`,

  // BASIC PAGE
  NOTFOUND: `${API_URL}/notfound`,
  MAINTENANCE: `${API_URL}/maintenance`,
  META: `${API_URL}/meta`
};

export default ENDPOINT;
