'use client';

import React, { FC, ReactNode } from 'react';
import Header from './Header';
import { useAlertStore, usePendingAlertStore } from '@/stores';
import { Alert, PendingAlert } from '../notification';
import Footer from './Footer';
import Translation from '../Translation';

type Props = {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  const { title, show, type, translationKey, rootTranslationKey } = useAlertStore();
  const pendingStore = usePendingAlertStore();
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Alert
          title={(
            <>
              {(translationKey && rootTranslationKey)
                ? <Translation
                  render={t => t(translationKey)}
                  translationKey={rootTranslationKey}
                />
                : title
              }
            </>
          )}
          show={show}
          type={type} />
        <PendingAlert show={pendingStore.show} />
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;