
import { prisma } from '@/lib/db'
import { registerUser } from '@/lib/auth/register'

// Mock Prisma
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(prisma)),
    consentLog: {
      create: jest.fn(),
    },
  },
}))

// Mock password hashing
jest.mock('@/lib/auth/password', () => ({
  hashPassword: jest.fn((pwd) => Promise.resolve(`hashed_${pwd}`)),
}))

describe('ConsentLog Creation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Default transaction mock to execute callback immediately
    ;(prisma.$transaction as jest.Mock).mockImplementation((cb) => cb(prisma))
  })

  it('creates a ConsentLog entry when ndprConsent is true', async () => {
    // Mock user finding (no existing user)
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    
    // Mock user creation response
    const mockUser = { id: 'user-123', email: 'test@example.com', name: 'Test' }
    ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

    // Call registerUser with consent
    await registerUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      ndprConsent: true,
      ipAddress: '127.0.0.1',
      userAgent: 'Jest-Test',
    })

    // Verify ConsentLog creation
    expect(prisma.consentLog.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-123',
        consentType: 'NDPR_CONTACT',
        ipAddress: '127.0.0.1',
        userAgent: 'Jest-Test',
        granted: true,
      },
    })
    
    // Verify ndprConsentAt was passed to user creation
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          ndprConsentAt: expect.any(Date),
        }),
      })
    )
  })

  it('does NOT create ConsentLog when ndprConsent is false/undefined', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user-456' })

    await registerUser({
      name: 'Test User',
      email: 'no-consent@example.com',
      password: 'password123',
      // ndprConsent undefined
    })

    expect(prisma.consentLog.create).not.toHaveBeenCalled()
    
    // Verify ndprConsentAt is null/undefined
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          ndprConsentAt: null, // or undefined depending on impl
        }),
      })
    )
  })
})
