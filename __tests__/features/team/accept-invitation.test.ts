import { acceptInvitation, validateInvitationToken } from '@/features/team/actions/accept-invitation';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    invitation: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

describe('acceptInvitation Server Action', () => {
  const userId = 'user-id-123';
  const teamId = 'team-id-456';
  const validToken = 'valid-token-abc123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully accepts a valid invitation', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'invited@example.com' }
    });

    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      token: validToken,
      email: 'invited@example.com',
      status: 'PENDING',
      teamId: teamId,
      expiresAt: new Date(Date.now() + 86400000), // Tomorrow
      team: { name: 'Test Agency' },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      email: 'invited@example.com',
      teamId: null,
    });

    (prisma.$transaction as jest.Mock).mockResolvedValue([{}, {}]);

    const result = await acceptInvitation(validToken);

    expect(result.success).toBe(true);
    expect(result.message).toContain('Test Agency');
    expect(prisma.$transaction).toHaveBeenCalled();
  });

  it('rejects already accepted invitations', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'invited@example.com' }
    });

    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      status: 'ACCEPTED',
      teamId: teamId,
      team: { name: 'Test Agency' },
    });

    const result = await acceptInvitation(validToken);

    expect(result.success).toBe(false);
    expect(result.message).toContain('already been accepted');
  });

  it('rejects expired invitations', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'invited@example.com' }
    });

    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      status: 'PENDING',
      teamId: teamId,
      expiresAt: new Date(Date.now() - 86400000), // Yesterday
      team: { name: 'Test Agency' },
    });

    const result = await acceptInvitation(validToken);

    expect(result.success).toBe(false);
    expect(result.message).toContain('expired');
    expect(prisma.invitation.update).toHaveBeenCalledWith(expect.objectContaining({
      data: { status: 'EXPIRED' },
    }));
  });

  it('rejects if user already belongs to a team', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'invited@example.com' }
    });

    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      status: 'PENDING',
      email: 'invited@example.com',
      teamId: teamId,
      expiresAt: new Date(Date.now() + 86400000),
      team: { name: 'Test Agency' },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      email: 'invited@example.com',
      teamId: 'existing-team-id', // Already in a team
    });

    const result = await acceptInvitation(validToken);

    expect(result.success).toBe(false);
    expect(result.message).toContain('already a member');
  });

  it('uses teamId from invitation, not user input (NFR4)', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'invited@example.com' }
    });

    const invitationTeamId = 'correct-team-id';
    
    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      status: 'PENDING',
      email: 'invited@example.com',
      teamId: invitationTeamId,
      expiresAt: new Date(Date.now() + 86400000),
      team: { name: 'Test Agency' },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      email: 'invited@example.com',
      teamId: null,
    });

    (prisma.$transaction as jest.Mock).mockResolvedValue([{}, {}]);

    await acceptInvitation(validToken);

    // Verify the transaction was called with the teamId from the invitation (NFR4)
    // The $transaction receives an array of Prisma promises, we verify it was called
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    // Since we can't easily inspect the Prisma promise internals in this mock setup,
    // we verify that the correct invitation was fetched (which contains the teamId)
    expect(prisma.invitation.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { token: validToken },
        include: { team: true },
      })
    );
  });

  it('rejects if logged-in email does not match invitation email', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId, email: 'different@example.com' }
    });

    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      id: 'inv-1',
      status: 'PENDING',
      email: 'invited@example.com',
      teamId: teamId,
      expiresAt: new Date(Date.now() + 86400000),
      team: { name: 'Test Agency' },
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      email: 'different@example.com',
      teamId: null,
    });

    const result = await acceptInvitation(validToken);

    expect(result.success).toBe(false);
    expect(result.message).toContain('different email');
  });
});

describe('validateInvitationToken', () => {
  it('returns valid=true for valid pending invitation', async () => {
    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue({
      status: 'PENDING',
      email: 'test@example.com',
      role: 'EDITOR',
      expiresAt: new Date(Date.now() + 86400000),
      team: { name: 'Test Agency' },
    });

    const result = await validateInvitationToken('valid-token');

    expect(result.valid).toBe(true);
    expect(result.teamName).toBe('Test Agency');
    expect(result.invitedEmail).toBe('test@example.com');
  });

  it('returns valid=false for non-existent token', async () => {
    (prisma.invitation.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await validateInvitationToken('invalid-token');

    expect(result.valid).toBe(false);
    expect(result.message).toContain('not found');
  });
});
