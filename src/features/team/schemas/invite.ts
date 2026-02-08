import { z } from "zod";
import { TeamRole } from "@prisma/client";

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(TeamRole),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
