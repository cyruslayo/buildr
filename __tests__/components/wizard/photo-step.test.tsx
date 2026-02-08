import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoStep } from '@/features/wizard/components/steps/photo-step';
import { useWizardStore } from '@/features/wizard/store/wizard-store';
import { PROPERTY_PHOTO_TRANSFORMATION } from '@/features/wizard/constants/upload';

// Mock the wizard store
jest.mock('@/features/wizard/store/wizard-store', () => ({
  useWizardStore: jest.fn(),
}));

// Mock the server action
jest.mock('@/features/wizard/actions/get-cloudinary-signature', () => ({
  getCloudinarySignature: jest.fn(() => Promise.resolve({ 
    success: true, 
    signature: 'mock', 
    timestamp: 123, 
    cloudName: 'test', 
    apiKey: 'key', 
    folder: 'folder',
    transformation: PROPERTY_PHOTO_TRANSFORMATION
  })),
}));

// Mock ImageGridPicker to simplify events
jest.mock('@/features/wizard/components/image-grid-picker', () => ({
  ImageGridPicker: ({ onUpload, uploadingFiles, images }: any) => (
    <div>
      <button data-testid="upload-button" onClick={() => onUpload([new File(['hello'], 'hello.png', { type: 'image/png' })])}>
        Mock Upload
      </button>
      {uploadingFiles.map((file: any) => (
        <div key={file.id}>
          <img src={file.preview} alt="Preview" />
          <div role="progressbar" aria-valuenow={file.progress}></div>
        </div>
      ))}
      {images.map((url: string) => (
        <img key={url} src={url} alt="Uploaded" />
      ))}
    </div>
  ),
}));

// Mock URL methods for JSDOM
if (typeof window !== 'undefined') {
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
  global.URL.revokeObjectURL = jest.fn();
}

describe('PhotoStep Component', () => {
  const mockSetPropertyData = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useWizardStore as unknown as jest.Mock).mockReturnValue({
      propertyData: { images: [] },
      setPropertyData: mockSetPropertyData,
    });
  });

  it('renders correctly', () => {
    render(<PhotoStep />);
    expect(screen.getByText(/Upload Photos/i)).toBeInTheDocument();
    expect(screen.getByText(/Add the best shots of your property/i)).toBeInTheDocument();
  });

  it('shows optimistic previews when files are selected', async () => {
    render(<PhotoStep />);
    const button = screen.getByTestId('upload-button');

    fireEvent.click(button);

    // Should show the image preview (optimistic)
    const preview = await screen.findByAltText(/Preview/);
    expect(preview).toBeInTheDocument();
  });

  it('displays progress indicator during upload', async () => {
    render(<PhotoStep />);
    const button = screen.getByTestId('upload-button');

    fireEvent.click(button);

    // Progress bar should appear
    const progress = await screen.findByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  it('includes transformation parameter in upload data', async () => {
    // Mock XHR
    const xhrMock: any = {
      open: jest.fn(),
      send: jest.fn(),
      upload: {},
      status: 200,
      responseText: JSON.stringify({ secure_url: 'https://res.cloudinary.com/test.jpg' }),
    };
    window.XMLHttpRequest = jest.fn(() => xhrMock) as any;

    render(<PhotoStep />);
    const button = screen.getByTestId('upload-button');
    fireEvent.click(button);

    // Wait for async effects
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(xhrMock.send).toHaveBeenCalled();
    const formData = xhrMock.send.mock.calls[0][0];
    expect(formData.get('transformation')).toBe(PROPERTY_PHOTO_TRANSFORMATION);
  });
});
