import InputGroup from '@/components/form/dynamic/InputGroup';
import { render, screen } from '@testing-library/react';
import { UseFormReturn, useForm } from 'react-hook-form';

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ translationKey, render }: any) => render((key: string) => key),
}));

jest.mock('@/components/form/dynamic/TranslationErrorMessage', () => ({
  __esModule: true,
  default: ({ errorKey }: any) => <div>{errorKey}</div>,
}));

const WrapperComponent = (props: any) => {
  const form = useForm();
  return <InputGroup form={form as UseFormReturn<any>} {...props} />;
};

describe('InputGroup', () => {
  const defaultProps = {
    config: {
      name: 'testName',
      before_text: 'beforeText',
      after_text: 'afterText',
    },
    type: 'text',
    errorMessage: 'Error message',
  };

  it('should render input with before and after text from config', () => {
    render(<WrapperComponent {...defaultProps} />);
    expect(screen.getByText('beforeText')).toBeInTheDocument();
    expect(screen.getByText('afterText')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render input with custom before and after text', () => {
    render(
      <WrapperComponent
        {...defaultProps}
        groupBeforeText="Custom Before"
        groupAfterText="Custom After"
      />,
    );
    expect(screen.getByText('Custom Before')).toBeInTheDocument();
    expect(screen.getByText('Custom After')).toBeInTheDocument();
  });

  it('should display the error message', () => {
    render(<WrapperComponent {...defaultProps} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should register the input with the form', () => {
    render(<WrapperComponent {...defaultProps} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'testName');
  });
});
