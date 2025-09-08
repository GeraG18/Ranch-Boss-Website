// import {getRequestConfig} from 'next-intl/server';
 
// export default getRequestConfig(async () => {
//   // Provide a static locale, fetch a user setting,
//   // read from `cookies()`, `headers()`, etc.
//   const locale = 'en';
 
//   return {
//     locale,
//     messages: (await import(`../messages/${locale}.json`)).default
//   };
// });

import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../jsons/translations/${locale}.json`)).default
  };
});