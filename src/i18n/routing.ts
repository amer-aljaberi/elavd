import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

const locales = ['en', 'ar'];

export const routing = defineRouting({
  locales,
  defaultLocale: 'ar',
  localePrefix: 'never',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
