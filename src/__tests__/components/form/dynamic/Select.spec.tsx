import Select from '@/components/form/dynamic/Select';
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

jest.mock('@/components/form/ErrorMessage', () => ({
  __esModule: true,
  default: ({ errorKey }: any) => <div>{errorKey}</div>,
}));

type FormWrapperProps = {
  children: (form: UseFormReturn<any>) => React.ReactNode;
};

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const form = useForm();
  return <>{children(form)}</>;
};

describe('Select Component', () => {
  const renderComponent = (config: any, errorMessage?: string) => {
    return render(
      <FormWrapper>
        {(form) => (
          <Select form={form} config={config} errorMessage={errorMessage} />
        )}
      </FormWrapper>,
    );
  };

  it('should render select options correctly without translation', () => {
    const config = {
      name: 'test',
      options: { option1: 'Option 1', option2: 'Option 2' },
    };

    renderComponent(config);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render select options correctly with dynamic translation', () => {
    const config = {
      name: 'test',
      options: { option1: 'Option 1', option2: 'Option 2' },
      option_translate_key: 'dynamic',
    };

    renderComponent(config);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
