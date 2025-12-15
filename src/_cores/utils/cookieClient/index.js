import jsCookie from 'js-cookie';

const get = (key, options = {}) => {
  const value = jsCookie.get(key);
  if (!value) return null;
  if (options.parseJson) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }
  return value;
};

const set = (key, value, options) => {
  const serialized = typeof value === 'string' ? value : JSON.stringify(value);
  jsCookie.set(key, serialized, {
    expires: 7,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    ...options
  });
};

const remove = (key, options) => {
  jsCookie.remove(key, {
    path: '/',
    ...options
  });
};

const token = (key = 'user') => {
  const user = get(key, { parseJson: true });
  return user?.accessToken ?? null;
};

const CookiesClient = { get, set, remove, token };
export default CookiesClient;
