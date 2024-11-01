'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
import BannerSearch from '@/app/[locale]/(home)/_components/banner-search/BannerSearch';


export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const isHomePage = pathname === `/${locale}/homeSection`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerWidth < 767 ? 180 : 210;
      
      if (window.scrollY >= scrollThreshold) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <BannerSearch />
              </div>
            </nav>
          )}
          
          {isHomePage && showSearch && (
            <nav className='mobileHeaderSearch'>
              <div className="headerSearch">
                <BannerSearch />
              </div>
            </nav>
          )}

          <div className='flex w-full justify-end gap-2'>
            <SocialIcons />
            {!isHomePage && (
              <Sheet>
                <SheetTrigger>
                  <Image
                    className='lg:hidden'
                    priority
                    width={24}
                    height={24}
                    src="/images/home/SearchOutline.svg"
                    alt="SearchOutline"
                  />
                </SheetTrigger>
                <SheetContent side={'top'}>
                  <div className="headerSearch">
                  <BannerSearch />
                  </div>
                  <SheetTitle>Header Navigation</SheetTitle>
                  <SheetDescription>
                    The main navigation of the page.
                  </SheetDescription>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
