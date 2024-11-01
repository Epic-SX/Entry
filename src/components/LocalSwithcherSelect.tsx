'use client';

import { usePathname, useRouter } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import React, { ChangeEvent, FC, ReactNode, useTransition } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
}

const LocalSwithcherSelect: FC<Props> = ({
  children,
  defaultValue,
}) => {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useSearchParams();

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void {
    const nextLocale = event.target.value;
    startTransition(() => {
      const queryParams = new URLSearchParams(params).toString();
      router.replace(
        `${pathname}?${queryParams}`,
        { locale: nextLocale }
      );
    });
  }

  return (
    <small>
      <select
        className="form-select bg-white text-dark pt-0 pb-0 pe-4 ps-1 rounded-1 fw-bold"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={handleSelectChange}
      >
        {children}
      </select>
    </small>
  )
}

export default LocalSwithcherSelect;