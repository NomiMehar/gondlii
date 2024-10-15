import {
  SectionWrapper,
  SectionDescription,
} from '@/components/shared/section';
import MainHeroBackground from './main-hero-background';
import HeaderInput from '@/components/headerComponents/HeaderInput/HeaderInput';

export default function MainHero() {

  return (
    <div className='relative w-full overflow-hidden'>
      <SectionWrapper className='flex h-full w-full flex-col items-center justify-center gap-15 text-center sm:gap-20'>
        <div className='flex flex-col items-center gap-8 p-3.75 text-white sm:gap-6'>
          <SectionDescription className='max-w-150'>
          Welcome back, Madeline.
          <br />
           What are you looking for today?
          </SectionDescription>
        <HeaderInput />
        </div>
      </SectionWrapper>
      <MainHeroBackground />
    </div>
  );
}
