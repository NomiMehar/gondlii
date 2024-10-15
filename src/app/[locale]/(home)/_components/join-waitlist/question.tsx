'use client';

import { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SurveyQuestion } from '@/types/api';

export interface JoinWaitlistQuestionProps {
  data: SurveyQuestion;
  singleSelect?: boolean;
  value?: string | string[];
  onChange: (value: JoinWaitlistQuestionProps['value']) => void;
}

export default function JoinWaitlistQuestion({
  data,
  value,
  singleSelect,
  onChange,
}: JoinWaitlistQuestionProps) {
  const { key, content, options } = data;

  const t = useTranslations();

  const [otherChecked, setOtherChecked] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const isArrayValue = Array.isArray(value);
  const isMax3 = content.includes('(Select up to 3)');
  const isMax = isArrayValue && isMax3 && value.length > 2;

  const changeHandler = (checked: boolean, v: string) => {
    if (singleSelect) {
      onChange(checked ? v : undefined);
      return;
    }

    const updatedValue = isArrayValue
      ? checked
        ? [...value, v]
        : value.filter((item) => item !== v)
      : [v];

    onChange(updatedValue);
  };

  const otherChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setOtherValue(newValue);

    if (isArrayValue) {
      const filteredValue = value.filter((item) => item !== otherValue);

      onChange(newValue ? [...filteredValue, newValue] : filteredValue);
    } else {
      onChange(newValue);
    }
  };

  const checkedChangeHandler = (checked: boolean, option: string) => {
    const isOther = option.includes('(please specify)');

    if (isMax && checked) {
      return;
    }

    if (isOther) {
      setOtherChecked(checked);

      if (!checked) {
        onChange(
          isArrayValue
            ? value.filter((item) => item !== otherValue)
            : undefined,
        );
      } else if (otherValue && !value?.includes(otherValue)) {
        onChange(isArrayValue ? [...value, otherValue] : otherValue);
      }
    } else {
      changeHandler(checked, option);
    }
  };

  return (
    <div className='w-full rounded-1.5lg border border-border-primary text-sm sm:text-base'>
      <div className='rounded-t-1.5lg bg-border-primary p-5'>
        <p>{content}</p>
      </div>
      <div className='flex flex-col gap-4 p-5'>
        {options.map((option) => {
          const id = `${key}-${option}`;
          const checked = option.includes('(please specify)')
            ? otherChecked
            : value?.includes(option);

          return (
            <label
              className={cn(
                'flex cursor-pointer items-center gap-3',
                isMax && !checked && 'pointer-events-none',
              )}
              htmlFor={id}
              key={id}
            >
              <Checkbox
                name={key}
                id={id}
                checked={checked}
                onCheckedChange={(checked: boolean) =>
                  checkedChangeHandler(checked, option)
                }
              />
              <p>{option}</p>
            </label>
          );
        })}
        {otherChecked && (
          <Input
            variant={'form'}
            placeholder={t('specify-reason')}
            autoFocus
            value={otherValue}
            onChange={otherChangeHandler}
          />
        )}
      </div>
    </div>
  );
}
