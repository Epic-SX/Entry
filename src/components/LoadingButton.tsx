import React, { FC } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string | React.ReactNode;
}

const LoadingButton: FC<Props> = ({ label, className, ...rest }) => {
    return (
        <>
            <button className={`btn btn-primary ${className}`} {...rest} type="button" disabled>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">{label ?? 'Loading...'}...</span>
            </button>
        </>
    )
}

export default LoadingButton
