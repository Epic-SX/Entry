'use client';
import { Link } from '@/navigation';
import { useSelectedLayoutSegment } from 'next/navigation';
import React, { ComponentProps, FC } from 'react';

const NavigationLink: FC<ComponentProps<typeof Link>> = ({
    href,
    ...rest
}) => {
    const selectedLayoutSegement = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegement ? `/${selectedLayoutSegement}` : '/';
    const isActive = pathname === href;
    return (
        <Link
            aria-current={isActive ? 'page' : undefined}
            href={href}
            className={`nav-link ${isActive ? 'active' : ''}`}
            {...rest}
        />
    )
}

export default NavigationLink;