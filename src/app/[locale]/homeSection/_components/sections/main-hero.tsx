import {
  SectionWrapper,
  SectionDescription,
} from '@/components/shared/section';
import MainHeroBackground from './main-hero-background';
import { useTranslations } from 'next-intl';
import BannerSearch from '@/app/[locale]/(home)/_components/banner-search/BannerSearch';

export default function MainHero() {
  const t = useTranslations();
  return (
    <div className='relative w-full overflow-hidden'>
      <SectionWrapper className='flex h-full w-full flex-col items-center justify-center gap-15 text-center sm:gap-20'>
        <div className='flex flex-col items-center gap-8 p-3.75 text-white sm:gap-6 w-100'>
          <SectionDescription className='max-w-150'>
          {t("welcome")}
          <br />
           {t("looking-for")}
          </SectionDescription>
        <BannerSearch />
        </div>
      </SectionWrapper>
      <MainHeroBackground />
    </div>
  );
}
