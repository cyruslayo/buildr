import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGridPicker } from '@/features/wizard/components/image-grid-picker';
import { useDropzone } from 'react-dropzone';

// Mock react-dropzone
jest.mock('react-dropzone', () => ({
  useDropzone: jest.fn(),
}));

describe('ImageGridPicker Component', () => {
  const mockOnUpload = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDropzone as jest.Mock).mockReturnValue({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: false,
    });
  });

  it('renders correctly', () => {
    render(
      <ImageGridPicker 
        images={[]} 
        onUpload={mockOnUpload} 
        onRemove={mockOnRemove} 
      />
    );
    expect(screen.getByText(/Drop your photos here/i)).toBeInTheDocument();
  });

  it('displays error message when file is too large', async () => {
    // Simulate dropzone rejection
    let dropCallback: any;
    (useDropzone as jest.Mock).mockImplementation(({ onDrop }: any) => {
      dropCallback = onDrop;
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false,
      };
    });

    render(
      <ImageGridPicker 
        images={[]} 
        onUpload={mockOnUpload} 
        onRemove={mockOnRemove} 
      />
    );

    // Call onDrop with a rejection
    dropCallback([], [
      {
        file: new File([''], 'large.jpg'),
        errors: [{ code: 'file-too-large', message: 'File is too large' }]
      }
    ]);

    expect(await screen.findByText(/Image too large. Please use a file under 5MB./i)).toBeInTheDocument();
  });

  it('displays error message for invalid file type', async () => {
    let dropCallback: any;
    (useDropzone as jest.Mock).mockImplementation(({ onDrop }: any) => {
      dropCallback = onDrop;
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false,
      };
    });

    render(
      <ImageGridPicker 
        images={[]} 
        onUpload={mockOnUpload} 
        onRemove={mockOnRemove} 
      />
    );

    // Call onDrop with a rejection
    dropCallback([], [
      {
        file: new File([''], 'doc.pdf'),
        errors: [{ code: 'file-invalid-type', message: 'Invalid file type' }]
      }
    ]);

    expect(await screen.findByText(/Invalid file type. Please use JPEG, PNG or WebP./i)).toBeInTheDocument();
  });

  it('allows dismissing error message', async () => {
    let dropCallback: any;
    (useDropzone as jest.Mock).mockImplementation(({ onDrop }: any) => {
      dropCallback = onDrop;
      return {
        getRootProps: () => ({}),
        getInputProps: () => ({}),
        isDragActive: false,
      };
    });

    render(
      <ImageGridPicker 
        images={[]} 
        onUpload={mockOnUpload} 
        onRemove={mockOnRemove} 
      />
    );

    // Trigger error
    dropCallback([], [
      {
        file: new File([''], 'large.jpg'),
        errors: [{ code: 'file-too-large', message: 'File' }]
      }
    ]);

    const errorMsg = await screen.findByText(/Image too large/i);
    expect(errorMsg).toBeInTheDocument();

    // Find and click dismiss button
    const closeButton = screen.getByLabelText(/Dismiss error/i);
    fireEvent.click(closeButton);

    // Error should be removed (using waitFor to handle AnimatePresence exit)
    expect(screen.queryByText(/Image too large/i)).not.toBeInTheDocument();
  });
});
