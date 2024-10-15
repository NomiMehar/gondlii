'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';
import { cn } from '@/lib/utils';

export default function FeaturesSection() {
  const t = useTranslations();

  const tabs = ['wellness-enthusiast', 'service-provider'];
  const features = [
    ['search', 'insights'],
    ['stories', 'scheduling'],
    ['gamification', 'loyalty'],
    ['content', 'optimization'],
  ];

  const [tab, setTab] = useState(tabs[0]);

  return (
    <SectionWrapper
      displayMountains
      id='features'
      className='mx-auto flex w-full flex-col items-center gap-10 bg-surface-brand text-center text-white sm:gap-20'
    >
      <SectionTitle>{t('features-title')}</SectionTitle>
      <div className='w-full space-y-8'>
        <div className='relative mx-auto flex w-fit rounded-3xl bg-feature backdrop-blur-2.5xl'>
          {tabs.map((item) => (
            <div key={item} className='relative'>
              <Button
                className={cn(
                  'transition-opacity duration-150 ease-in-out',
                  item !== tab && 'opacity-0',
                )}
                size={'xs'}
                onClick={setTab.bind(null, item)}
              >
                {t(item)}
              </Button>
              <span
                aria-hidden
                className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nowrap text-sm'
              >
                {t(item)}
              </span>
            </div>
          ))}
          <div className='glass-border before:rounded-3xl' />
        </div>
        <div className='relative grid w-full gap-px overflow-hidden rounded-3xl bg-border-feature backdrop-blur-2.5xl sm:grid-cols-2'>
          {features.map((features, index) => (
            <div className='relative bg-feature' key={index}>
              {features.map((feature) => {
                const active = tabs[features.indexOf(feature)] === tab;

                return (
                  <div
                    className={cn(
                      'relative w-full overflow-hidden px-3.75 text-center transition-opacity duration-150 ease-in-out sm:px-8',
                      !active && 'absolute left-0 top-0 opacity-0',
                    )}
                    key={feature}
                  >
                    <div className='flex min-h-39.25 flex-col justify-center gap-3 py-5'>
                      <h3 className='text-lg font-medium sm:text-xl'>
                        {t(`features-${feature}-title`)}
                      </h3>
                      <p className='mx-auto max-w-150 text-sm sm:text-base'>
                        {t(`features-${feature}-description`)}
                      </p>
                    </div>
                    <Image
                      src={`/images/features/${feature}.png`}
                      alt='feature'
                      width={477}
                      height={393}
                      quality={100}
                      className='mx-auto'
                    />
                  </div>
                );
              })}
              <div className='absolute bottom-0 h-22.25 w-full bg-feature-gradient' />
            </div>
          ))}
          <div className='glass-border before:rounded-3xl' />
        </div>
      </div>
      <div className='flex flex-col gap-15 sm:gap-10'>
        <SectionDescription className='max-w-212.5'>
          {t('features-description')}
        </SectionDescription>
        <Link href='#waitlist'>
          <Button size='lg'>{t('join-waitlist')}</Button>
        </Link>
      </div>
    </SectionWrapper>
  );
}
