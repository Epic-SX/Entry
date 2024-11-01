'use client';

import { authService } from '@/services';
import React, { FC, ReactNode, use, useEffect } from 'react';

type Props = {
  roles?: Array<number>;
  isRequiredAuth?: boolean;
  children: ReactNode;
}

const ProtectedLink: FC<Props> = ({ roles, isRequiredAuth, children }) => {
  const loginInfo = authService.getLoginInfoFromCookie();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <></>;
  }
  if (!isRequiredAuth
    || (loginInfo
      && authService.isLoggedIn()
      && (!roles || roles.includes(loginInfo.role)))) {
    return <>{children}</>
  } else {
    return <></>;
  }
}

export default ProtectedLink;