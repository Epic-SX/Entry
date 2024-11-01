"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { auth_routes } from "@/routes";
import { authService } from "@/services";
import LoadingSkeleton from "../LoadingSkeleton";

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isLoggedIn = authService.isLoggedIn();
  const [isCheckedLogin, setIsCheckedLogin] = useState<boolean>(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = new URLSearchParams(searchParams).toString();
    const callbackUrl = `${pathName}?${query}`;
    const encodeUrl = encodeURIComponent(callbackUrl);
    if (!isLoggedIn) {
      router.replace(`${auth_routes.login}?callbackUrl=${encodeUrl}`);
    } else {
      setIsCheckedLogin(true);
    }
  }, [isLoggedIn, pathName, router, searchParams]);

  if (!isCheckedLogin) {
    return <LoadingSkeleton count={7} />;
  }
  return <>{children}</>;
};

export default AuthLayout;
