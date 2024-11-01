'use client';

import { MenuItemsProps } from '@/types';
import React, { FC } from 'react';
import ProtectedLink from '../ProtectedLink';
import NavigationLink from '../NavigationLink';
import Translation from '../Translation';
import { usePathname } from '@/navigation';



const ListMenu: FC<{ items: Array<MenuItemsProps> }> = ({ items }) => {
    const pathname = usePathname();
    if (!items || items.length == 0) {
        return <></>;
    } else {
        return (
            <>
                {items.map(({ path, translationKey, isRequiredAuth, roles, title }, index) => (
                    <ProtectedLink
                        isRequiredAuth={isRequiredAuth}
                        roles={roles}
                        key={index}
                    >
                        <li className={(pathname === path || (!pathname.endsWith('pastel') && pathname.includes(path))) ? "nav-item active" : "nav-item"} >
                            {translationKey
                                ? (
                                    <NavigationLink className="nav-link text-light text-nowrap" href={path}>
                                        <small>
                                            <Translation
                                                translationKey='Navigation'
                                                render={(t) => <>{t(translationKey || '')}</>}
                                            />
                                        </small>
                                    </NavigationLink>
                                ) : (
                                    <NavigationLink className="nav-link text-light text-nowrap" href={path}>
                                        <small>
                                            {title}
                                        </small>
                                    </NavigationLink>
                                )}

                        </li>
                    </ProtectedLink>
                ))}
            </>
        );
    }
}

const MainMenu: FC = () => {
    return (
        <>
            <ul className="navbar-nav justify-content-center">
                {/* <ListMenu items={menuItems} /> */}
                <ListMenu items={[]} />
            </ul>
        </>
    );
}

export default MainMenu;
