'use client';
import React, { FC, useEffect, useState } from 'react';
import MainMenu from './MainMenu';
import RightMenu from './RightMenu';
import Translation from '../Translation';
import { authService } from '@/services';
import NavigationLink from '../NavigationLink';

const Header: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLoggedIn = authService.isLoggedIn();
  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthenticated(true);
    }
  }, [isLoggedIn]);

  return (
    <header className="header fixed-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {isAuthenticated ? (
            <NavigationLink className="navbar-brand text-white" href="/">
              <Translation
                translationKey="HeaderTitle"
                render={(t) => <>{t('title')}</>}
              />
            </NavigationLink>
          ) : (
            <span className="navbar-brand text-white">
              <Translation
                translationKey="HeaderTitle"
                render={(t) => <>{t('title')}</>}
              />
            </span>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <MainMenu />
          </div>
          <div>
            <RightMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
