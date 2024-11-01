import StepBar from '@/components/form/dynamic/StepBar';
import { render, screen } from '@testing-library/react';

describe('StepBar Component', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3'];
  const renderStep = (step: string) => <span>{step}</span>;

  it('should render steps correctly', () => {
    render(<StepBar steps={steps} current={1} render={renderStep} />);

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
