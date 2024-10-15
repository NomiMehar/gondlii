import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  locales: locales,
  defaultLocale: locales[0],
});

export const config = {
  matcher: ['/', '/(en|de|fr|it)/:path*'],
};
