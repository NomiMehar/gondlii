// components/HeaderSelector.tsx (Client Component)
"use client"; // This marks it as a Client Component

import { usePathname } from 'next/navigation';
import HeaderOld from '@/components/shared/headerOld';
import Header from '@/components/shared/header';
import { useLocale } from 'next-intl';

export default function HeaderSelector() {
  const pathname = usePathname(); // This works only in Client Components
    const locale = useLocale();
  // Render Header for the home page, HeaderOld for other pages
  return pathname === `/${locale}` ? <HeaderOld /> : <Header />;
}
