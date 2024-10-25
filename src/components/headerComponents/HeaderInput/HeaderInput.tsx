import React from 'react';
import './HeaderInput.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const HeaderInput: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <React.Fragment>
      <div className="headerInput">
        <Image priority width={24} height={24} src="/images/home/SearchOutline.svg" alt="SearchOutline" />
        <input
          spellCheck='false'
          type="text"
          placeholder={t("search-paceholder")}
        />
        <button>{t("search")}</button>
      </div>
    </React.Fragment>
  );
};

export default HeaderInput;
