import { cookies as serverCookies } from 'next/headers';

const get = (key, options = {}) => {
  const cookieStore = serverCookies();
  const value = cookieStore.get(key)?.value;
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

const token = (key = 'user') => {
  const user = get(key, { parseJson: true });
  return user?.accessToken ?? null;
};

const CookiesServer = { get, token };

export default CookiesServer;
