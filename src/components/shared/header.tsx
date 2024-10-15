'use client';

import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu } from '@/icons';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import HeaderInput from '../headerComponents/HeaderInput/HeaderInput';
import SocialIcons from '../headerComponents/SocialIcons/SocialIcons';
import { useLocale } from 'next-intl';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  // Check if the current route is the home page
  const isHomePage = pathname === `/${locale}/homeSection`;

  return (
    <header className='fixed top-0 z-30 w-full bg-surface-brand'>
      <div className="container">
        <div className="flex items-center justify-between gap-2 h-16.75 sm:h-18.5">
          <div className='w-full logoWrap'>
            <Image
              src={'/images/logo/index.svg'}
              alt='logo'
              priority
              width={101}
              height={22}
              className='h-4.5 w-auto sm:h-auto'
            />
          </div>
          
          {!isHomePage && (
            <nav className='hidden lg:block'>
              <div className="headerSearch">
              <HeaderInput />
              </div>
            </nav>
          )}

          <div className='flex w-full justify-end gap-2'>
            <SocialIcons />
            <Sheet>
              <SheetTrigger>
                <Menu className='text-white lg:hidden' />
              </SheetTrigger>
              <SheetContent side={'top'}>
                <HeaderInput />
                <SheetTitle>Header Navigation</SheetTitle>
                <SheetDescription>
                  The main navigation of the page.
                </SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
