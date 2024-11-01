import React, { FC, ReactNode } from 'react'
import Header from './Header';
import Footer from './Footer';

type Props = {
    children: ReactNode;
}
const ErrorLayout: FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default ErrorLayout;
