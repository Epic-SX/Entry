import clsx from 'clsx';
import React, { FC } from 'react';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const FormLabel: FC<FormLabelProps> = ({ children, className, ...props }) => {
  return (
    <label className={clsx(className)} {...props}>
      {children}
    </label>
  );
};

export default FormLabel;
