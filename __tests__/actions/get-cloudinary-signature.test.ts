import { getCloudinarySignature } from '@/features/wizard/actions/get-cloudinary-signature';
import { v2 as cloudinary } from 'cloudinary';
import { PROPERTY_PHOTO_TRANSFORMATION } from '@/features/wizard/constants/upload';

// Mock cloudinary SDK
jest.mock('cloudinary', () => ({
  v2: {
    utils: {
      api_sign_request: jest.fn(),
    },
    config: jest.fn(),
  },
}));

// Mock auth/session
jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

describe('getCloudinarySignature Server Action', () => {
  const mockTimestamp = 1234567890;
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockTimestamp * 1000));
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test_cloud';
    process.env.CLOUDINARY_API_KEY = 'test_key';
    process.env.CLOUDINARY_API_SECRET = 'test_secret';

    const { auth } = require('@/lib/auth/auth');
    auth.mockResolvedValue({ user: { id: 'user_1', teamId: 'team_1' } });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('generates a valid signature for authenticated users', async () => {
    (cloudinary.utils.api_sign_request as jest.Mock).mockReturnValue('mock_signature');

    const result = await getCloudinarySignature();

    expect(result.success).toBe(true);
    expect(result.signature).toBe('mock_signature');
    expect(result.timestamp).toBe(mockTimestamp);
    expect(result.folder).toBe('buildr/team_1/listings');
    expect(result.transformation).toBe(PROPERTY_PHOTO_TRANSFORMATION);
    expect(cloudinary.utils.api_sign_request).toHaveBeenCalledWith(
      expect.objectContaining({ 
        timestamp: mockTimestamp,
        folder: 'buildr/team_1/listings',
        transformation: PROPERTY_PHOTO_TRANSFORMATION
      }),
      'test_secret'
    );
  });

  it('fails if no user session is found', async () => {
    const { auth } = require('@/lib/auth/auth');
    auth.mockResolvedValueOnce(null);

    const result = await getCloudinarySignature();

    expect(result.success).toBe(false);
    expect(result.error).toBe('Unauthorized');
  });

  it('fails if environment variables are missing', async () => {
    delete process.env.CLOUDINARY_API_SECRET;

    const result = await getCloudinarySignature();

    expect(result.success).toBe(false);
    expect(result.error).toBe('Cloudinary configuration missing');
  });
});
