import AdditionalForm from '@/app/[locale]/(guest)/entries/_components/AdditionalForm';
import { render, screen } from '@testing-library/react';

jest.mock('@/app/[locale]/(guest)/entries/_components/CheckboxConfirm', () => {
  return jest.fn(({ translationKey, lables, name }) => (
    <div data-testid={`checkbox-confirm-${translationKey}`}>
      {lables} - {name}
    </div>
  ));
});

describe('AdditionalForm', () => {
  const mockForm = {};

  it('should render null when values are empty', () => {
    render(<AdditionalForm values={[]} form={mockForm} />);
    expect(screen.queryByTestId('form-check')).not.toBeInTheDocument();
  });

  it('should render CheckboxConfirm components for each value', () => {
    const values = [
      { lables: 'Label 1', name: 'name1' },
      { lables: 'Label 2', name: 'name2' },
    ];

    render(<AdditionalForm values={values} form={mockForm} />);

    values.forEach((value, index) => {
      expect(
        screen.getByTestId(`checkbox-confirm-${index + 1}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${value.lables} - ${value.name}`),
      ).toBeInTheDocument();
    });
  });
});
