'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Input, InputProps } from './input';
import { handleError } from '@/lib/utils';
import { axios, csrf } from '@/lib/axios';
import { Search } from '@/icons';

export interface bannerSearchProps {
  inputVariant?: InputProps['variant'];
}

export default function BannerSearch({ inputVariant }: bannerSearchProps) {
  const t = useTranslations();

  const { formState, register, reset, handleSubmit } = useForm();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const submitHandler: SubmitHandler<{
    email?: string;
  }> = async ({ email }) => {
    try {
      await csrf();

      await axios.post('/subscribe', { email });

      setDialogOpen(true);
      reset();
    } catch (error: any) {
      handleError(error, t);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className='w-full max-w-150'>
        <Input
          variant={inputVariant}
          type='text'
          Icon={Search}
          placeholder={t('search-paceholder')}
          submitButton={{
            children: t('search'),
            loading: formState.isSubmitting,
          }}
          autoComplete='off'
          {...register('email', { required: true })}
        />
      </form>
    </>
  );
}
