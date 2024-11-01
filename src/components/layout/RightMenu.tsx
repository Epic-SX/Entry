'use client';

import { useGetCurrentUser } from '@/hooks';
import { authService } from '@/services';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';
import { LoadingButton, LocaleSwithcher, Spiner, Translation } from '..';

const RightMenu = () => {
    const currentUser = useGetCurrentUser();

    const [mount, setMount] = useState(false);

    const [isLogouting, setIsLogouting] = useState(false);

    useEffect(() => {
        setMount(true);
    }, [])
    
    const handleLogout = (event: any) => {
        event.preventDefault();
        setIsLogouting(true);
        authService.logout().then(() => {
            authService.onLogoutSuccess();
        })
            .finally(() => {
                setIsLogouting(false);
            })
    }
    if (isLogouting) {
        return <LoadingButton label={(<Translation translationKey="Logout" render={(t) => <>{t('pendingTitle')}...</>} />)} />

    }
    if (!mount) {
        return <Spiner />;
    }
    if (currentUser.isAuthenticated) {
        return (
            <div>
                <AuthDropDown
                    label={currentUser.name}
                    onLogout={handleLogout}
                />
            </div>
        );
    } else {
        return (
            <div className='d-flex align-items-center'>
                <LocaleSwithcher />
            </div>
        );
    }
}

type AuthProps = {
    label?: string;
    onLogout: (event: any) => void;
}
const AuthDropDown: FC<AuthProps> = ({ label, onLogout }) => {
    return (
        <ul className="nav navbar-nav navbar-right">
            <li className="nav-item dropdown">
                <Link className="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {label ?? 'N/A'}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                    <li>
                        <Link
                            className="dropdown-item"
                            href="#"
                            onClick={onLogout}
                        >
                            <Translation
                                translationKey="Logout"
                                render={(t) => <>{t('title')}</>}
                            />
                        </Link>
                    </li>

                </ul>
            </li>
        </ul>
    );
}

export default RightMenu;
