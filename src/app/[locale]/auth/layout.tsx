import { MainLayout } from '@/components/layout';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const UnauthLayout: FC<Props> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default UnauthLayout;
