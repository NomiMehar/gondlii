'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from '@/icons';
export default function Footer() {
  const locale = useLocale();
  const t = useTranslations();

  const navigation = [
    {
      title: t('discover'),
      links: [
        {
          label: t('about-us'),
          href: '/about-us',
        },
        {
          label: t('services'),
          href: '#',
        },
        {
          label: t('subscriptions'),
          href: '#',
        },
        {
          label: t('our-blog'),
          href: '/blog/1',
        },
      ],
    },
    {
      title: t('help'),
      links: [
        {
          label: t('faq'),
          href: '#',
        },
        {
          label: t('customer-service'),
          href: '#',
        },
        {
          label: t('terms-and-conditions'),
          href: '#',
        },
        {
          label: t('privacy-policy'),
          href: '#',
        },
      ],
    },
    {
      title: t('find-us-on'),
      links: [
        {
          label: 'Facebook',
          href: '#',
        },
        {
          label: 'Instagram',
          href: '#',
        },
        {
          label: 'Twitter',
          href: '#',
        },
        {
          label: 'Linkedin',
          href: '#',
        },
      ],
    },
    {
      title: t('business'),
      links: [
        {
          label: t('register-your-business'),
          href: '#',
        },
        {
          label: t('advertise-on-gondli'),
          href: '#',
        },
      ],
    },
  ];
  return (
      <footer className='flex w-full flex-col bg-surface-brand px-3.75 py-8 text-sm text-white sm:text-base lg:px-25'>
        <Image
          src={'/images/logo/index.svg'}
          alt='logo'
          priority
          width={82}
          height={18}
          className='sm:hidden'
        />
        <nav className='grid grid-cols-2 gap-y-11 pt-10 sm:grid-cols-4 sm:gap-x-5 sm:pt-0'>
          {navigation.map(({ title, links }) => (
            <ul key={title} className='space-y-3'>
              <h3 className='text-situational-secondary'>{title}</h3>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link href={`/${locale}${href}`}>{label}</Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <div className='mt-10 h-px w-full bg-situational-primary sm:mt-8' />
        <div className='flex w-full items-center justify-between pt-5 sm:pt-8'>
          <div className='flex items-center gap-1.5'>
            <Globe />
            <p>{t('switzerland')}</p>
          </div>
          <Image
            src={'/images/logo/index.svg'}
            alt='logo'
            priority
            width={102}
            height={24}
            className='hidden sm:block'
          />
          <p>© 2023. {t('all-rights-reserved')}</p>
        </div>
      </footer>
  );
}
