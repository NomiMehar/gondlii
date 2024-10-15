import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@/components/shared/section';

export default function SolutionsSection() {
  const t = useTranslations();

  const solutions = [
    'local',
    'flexible',
    'visibility',
    'trustworthy',
    'seamless',
    'targeted',
  ];

  return (
    <SectionWrapper id='solutions' className='space-y-10 sm:space-y-20'>
      <div className='space-y-8 text-center sm:space-y-6'>
        <SectionTitle>{t('solutions-title')}</SectionTitle>
        <SectionDescription>{t('solutions-description')}</SectionDescription>
      </div>
      <div className='grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-primary bg-border-primary sm:grid-cols-3'>
        {solutions.map((solution) => (
          <div
            className='w-full space-y-5 bg-surface-primary px-5 py-10 sm:space-y-6 sm:p-10 2xl:py-25'
            key={solution}
          >
            <Image
              src={`/images/solutions/${solution}.svg`}
              alt='solution'
              width={40}
              height={40}
              className='mx-auto'
            />
            <div className='space-y-3 text-center text-sm sm:text-base'>
              <h3 className='font-medium sm:text-xl'>
                {t(`solutions-${solution}-title`)}
              </h3>
              <p>{t(`solutions-${solution}-description`)}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
