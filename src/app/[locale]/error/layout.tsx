'use client';

import { ErrorLayout } from "@/components/layout";
import { Alert } from "@/components/notification";
import { useAlertStore } from "@/stores";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    const { title, show, type } = useAlertStore();
    return (
        <ErrorLayout>
            <Alert title={title} show={show} type={type} />
            {children}
        </ErrorLayout>
    )
}

export default Layout;