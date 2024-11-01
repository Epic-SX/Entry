import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UseMutationResult } from '@tanstack/react-query';
import { TUploadImage } from '@/types';
import { StaticImageData } from 'next/image';
import PhotoUploadSection from '@/app/[locale]/(guest)/tasks/_components/PhotoUploadSection';

jest.mock('@/components/Translation', () => ({
  __esModule: true,
  default: ({ render }: { translationKey: string; render: any }) => (
    <>{render((key: string) => key)}</>
  ),
}));

jest.mock('@/components/form', () => ({
  ErrorMessage: ({ errorMessage }: { errorMessage: string }) => (
    <div>{errorMessage}</div>
  ),
}));

jest.mock('next/image', () => {
  const NextImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  NextImage.displayName = 'NextImage';
  return NextImage;
});

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

describe('PhotoUploadSection', () => {
  const mockMutation: UseMutationResult<
    TUploadImage,
    Error,
    FormData,
    unknown
  > = {
    mutate: jest.fn(),
    isError: false,
    isSuccess: false,
    isPending: false,
    status: 'idle',
    data: undefined,
    error: null,
    reset: jest.fn(),
    failureCount: 0,
    context: undefined,
    variables: undefined,
    mutateAsync: jest.fn(),
  } as unknown as UseMutationResult<TUploadImage, Error, FormData, unknown>;

  const setShowModal = jest.fn();

  const defaultProps = {
    title: 'Upload Photo',
    photoUrl: '',
    defaultImg: '/default.png' as unknown as StaticImageData,
    isConfirm: false,
    uploadMutation: mockMutation,
    setShowModal,
    errorMessage: 'Error message',
  };

  it('renders correctly', () => {
    render(<PhotoUploadSection {...defaultProps} />);

    expect(screen.getByText('Upload Photo')).toBeInTheDocument();
    expect(screen.getByAltText('placeholder')).toBeInTheDocument();
    expect(screen.getByText('change_photo_btn')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('calls setShowModal when the button is clicked', () => {
    render(<PhotoUploadSection {...defaultProps} />);

    fireEvent.click(screen.getByText('change_photo_btn'));
    expect(setShowModal).toHaveBeenCalledWith(true);
  });

  it('does not show upload button or error message when isConfirm is true', () => {
    render(<PhotoUploadSection {...defaultProps} isConfirm={true} />);

    expect(screen.queryByText('change_photo_btn')).not.toBeInTheDocument();
    expect(screen.queryByText('Error message')).not.toBeInTheDocument();
  });
});
