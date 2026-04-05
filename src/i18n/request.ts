import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as string)) {
    locale = routing.defaultLocale;
  }

  const lang = locale;

  const messagesPaths = ['common', 'auth', 'dashboard'];

  const messagesArray = await Promise.all(
    messagesPaths.map(async (path) => {
      const routeMessages = (
        await import(`../../messages/${path}/${lang}.json`)
      ).default;
      return routeMessages;
    })
  );

  const messages = messagesArray.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  );

  return {
    locale,
    messages,
  };
});
