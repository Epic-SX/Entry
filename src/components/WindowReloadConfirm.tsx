'use client';

import React, { useEffect } from 'react';

const WindowReloadConfirm = () => {
    useEffect(() => {
        const handleBeforeUnload = (e:any) => {
            e.preventDefault();
            e.returnValue = ''; 
            return ''; 
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return null; 
}

export default WindowReloadConfirm;