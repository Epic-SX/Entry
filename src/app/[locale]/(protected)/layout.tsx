import { AuthLayout, MainLayout } from '@/components/layout';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
/**
 * 認証機能を使用して保護されたレイアウト コンポーネントをレンダリングします。
 *
 * @param {Props} Children - レイアウト内でレンダリングされる子コンポーネント。
 * @return {JSX.Element} 認証要素を含む保護されたレイアウト コンポーネント。
 */
const ProtectedLayout: FC<Props> = ({ children }: Props): JSX.Element => {
  return (
    <AuthLayout>
      <MainLayout>{children}</MainLayout>
    </AuthLayout>
  );
};

export default ProtectedLayout;
