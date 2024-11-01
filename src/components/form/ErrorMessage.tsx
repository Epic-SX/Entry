'use client';
import { useTranslations } from 'next-intl';
import React, { FC, ReactNode } from 'react';

type ErrorMessageProps = {
  errorMessage?: string | ReactNode;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  const tValidation = useTranslations('FormValidation');
  if (!errorMessage) {
    return null;
  }
  errorMessage =
    errorMessage === 'Expected string, received null'
      ? tValidation('required_general')
      : errorMessage;
  if (errorMessage === undefined || errorMessage === 'undefined') {
    return null;
  }    
  return (
    <div>
      <small className="text-danger fst-italic">{errorMessage}</small>
    </div>
  );
};

export default ErrorMessage;
