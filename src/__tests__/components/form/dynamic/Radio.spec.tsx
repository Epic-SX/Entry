import Radio from '@/components/form/dynamic/Radio';
import { render, screen } from '@testing-library/react';
import { UseFormReturn, useForm } from 'react-hook-form';
jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: any) => render((key: string) => key),
}));

jest.mock('@/components/form/dynamic/TranslationErrorMessage', () => ({
  __esModule: true,
  default: ({ errorKey }: any) => <div>{errorKey}</div>,
}));

const WrapperComponent = (props: any) => {
  const form = useForm();
  return <Radio form={form as UseFormReturn<any, any>} {...props} />;
};

describe('Radio', () => {
  const defaultProps = {
    config: {
      name: 'testName',
      default: 'option1',
      options: {
        option1: 'Option 1',
        option2: 'Option 2',
      },
      option_translate_key: 'translationKey',
    },
    errorMessage: 'Error message',
  };

  it('should render radio options correctly', () => {
    render(<WrapperComponent {...defaultProps} />);
    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
  });

  it('should register the radio buttons with the form', () => {
    render(<WrapperComponent {...defaultProps} />);
    const radio1 = screen.getByText('option1') as HTMLInputElement;
    const radio2 = screen.getByText('option2') as HTMLInputElement;
    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
  });
});
