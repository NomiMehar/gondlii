import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
} from '@/components/shared/section';

export default function ExploreSection() {
  const t = useTranslations();

  const services = [
    'yoga',
    'fitness',
    'massage',
    'sauna',
    'spa',
    'reiki',
    'chiropractic',
    'pilates',
    'meditation',
    'nutrition',
    'ayurveda',
    'acupuncture',
    'aromatherapy',
    'counseling',
    'detox',
    'mindfulness',
    'retreats',
    'coaching',
    'tai-chi',
  ];

  return (
    <SectionWrapper
      id='explore'
      className='flex justify-center gap-10 sm:items-center sm:justify-between'
    >
      <div className='flex w-full flex-col justify-center gap-10 sm:max-w-162.5 sm:gap-17.25'>
        <div className='space-y-8 text-center sm:space-y-10 sm:text-start'>
          <SectionTitle>{t('explore-title')}</SectionTitle>
          <Image
            src={'/images/explore.png'}
            alt='explore'
            width={345}
            height={345}
            quality={100}
            className='mx-auto h-86.25 w-86.25 rounded-3xl object-cover object-center sm:mx-0 lg:hidden'
          />
          <SectionDescription>{t('explore-description')}</SectionDescription>
        </div>
        <div className='flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-2.5'>
          {services.map((service) => (
            <Badge key={service}>{t(service)}</Badge>
          ))}
          <Badge>{t('and-many-more')}</Badge>
        </div>
      </div>
      <Image
        src={'/images/explore.png'}
        alt='explore'
        width={450}
        height={650}
        quality={100}
        className='hidden rounded-3xl lg:block'
      />
    </SectionWrapper>
  );
}
