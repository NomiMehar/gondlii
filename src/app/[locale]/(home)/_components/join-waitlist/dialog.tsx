'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';
import useSWR from 'swr';
import {
  Dialog,
  DialogContent,
  DialogMain,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { cn, handleError } from '@/lib/utils';
import { axios, csrf } from '@/lib/axios';
import { SurveyQuestions } from '@/types/api';
import JoinWaitlistQuestion from './question';

interface JoinWaitlistDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function JoinWaitlistDialog({
  open,
  setOpen,
}: JoinWaitlistDialogProps) {
  const locale = useLocale();

  const t = useTranslations();

  const { control, formState, reset, handleSubmit } = useForm();

  const { data } = useSWR(locale ? '/survey/questions' : null, (url) =>
    axios.get<SurveyQuestions>(url).then((res) => res.data.data),
  );

  const [step, setStep] =
    useState<SurveyQuestions['data']['sections'][number]>();

  const openChangeHandler = (open: boolean) => {
    setTimeout(() => {
      reset();
      setStep(undefined);
    }, 200);

    setOpen(open);
  };

  const submitHandler: SubmitHandler<{
    q1?: SurveyQuestions['data']['sections'][number];
  }> = async (submittedData) => {
    if (!step && submittedData.q1) {
      const updatedStep =
        data?.sections?.[
          data?.questions?.[0]?.options?.indexOf(submittedData?.q1)
        ];

      setStep(updatedStep);
      return;
    }

    try {
      await csrf();

      const response = await axios.post('/survey/answers', submittedData);

      openChangeHandler(false);

      toast('success', response.data.message);
    } catch (error: any) {
      handleError(error, t);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogMain className={cn(!step && 'pb-5 sm:pb-4')}>
            <div
              className={cn(
                'space-y-5 pb-8 text-center sm:pb-10 sm:pt-7',
                step && 'sr-only',
              )}
            >
              <DialogTitle>{t('join-waitlist-welcome-title')}</DialogTitle>
              <DialogDescription>
                {t('join-waitlist-welcome-description')}
              </DialogDescription>
            </div>
            <div className='space-y-3'>
              {data &&
                (step ? data[step] : data.questions).map((question) => (
                  <Controller
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <JoinWaitlistQuestion
                        data={question}
                        singleSelect={question.type === 'radio'}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                    name={question.key}
                    key={question.key}
                  />
                ))}
            </div>
          </DialogMain>
          <DialogFooter className={cn(!step && 'border-none')}>
            <Button
              type='button'
              variant={'outline'}
              size={'sm'}
              onClick={openChangeHandler.bind(null, false)}
            >
              {!step ? t('do-it-later') : t('discard')}
            </Button>
            <Button type='submit' size={'sm'} loading={formState.isSubmitting}>
              {!step ? t('next-step') : t('finish')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
