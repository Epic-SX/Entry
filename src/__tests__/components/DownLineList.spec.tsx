import DownLineList from '@/components/DownLineList';
import { render, screen } from '@testing-library/react';

describe('DownLineList', () => {
  it('should render lines correctly', () => {
    const lines = 'line1\nline2\nline3';
    const renderMock = jest.fn((line) => <div>{line}</div>);
    render(<DownLineList line={lines} render={renderMock} />);
    expect(screen.getByText('line1')).toBeInTheDocument();
    expect(screen.getByText('line2')).toBeInTheDocument();
    expect(screen.getByText('line3')).toBeInTheDocument();
    expect(renderMock).toHaveBeenCalledTimes(3);
  });

  it('should render custom elements', () => {
    const lines = 'line1\nline2\nline3';
    const renderMock = jest.fn((line) => <span>{line}</span>);
    render(<DownLineList line={lines} render={renderMock} />);
    expect(screen.getByText('line1')).toBeInTheDocument();
    expect(screen.getByText('line2')).toBeInTheDocument();
    expect(screen.getByText('line3')).toBeInTheDocument();
    expect(renderMock).toHaveBeenCalledTimes(3);
    expect(
      screen.getAllByText(/line[1-3]/).every((el) => el.tagName === 'SPAN'),
    ).toBe(true);
  });
});
