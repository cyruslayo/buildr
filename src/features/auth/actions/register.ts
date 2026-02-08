'use server'

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const FormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  ndprConsent: z.string().refine((val) => val === 'on', {
    message: 'You must agree to be contacted to create an account.',
  }),
})

export type State = {
  message?: string | null
  success?: boolean
}

export async function register(prevState: State | undefined, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    ndprConsent: formData.get('ndprConsent'),
  })

  if (!validatedFields.success) {
    // Check if it's specifically the consent checkbox (Zod 4 uses .issues)
    const consentError = validatedFields.error.issues.find(
      (issue) => issue.path[0] === 'ndprConsent'
    )
    if (consentError) {
      return {
        success: false,
        message: 'You must agree to be contacted to create an account.',
      }
    }
    return {
      success: false,
      message: 'Missing Fields. Failed to Create Account.',
    }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  
  // Capture IP address for NDPR audit log (NFR6)
  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] || 
                    headersList.get('x-real-ip') || 
                    'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { success: false, message: 'Email already in use.' }
    }

    const now = new Date()

    // Create user with consent timestamp and consent log in a transaction (NFR6)
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          ndprConsentAt: now, // Store consent timestamp on user
        },
      })

      // Create NDPR consent audit log
      await tx.consentLog.create({
        data: {
          userId: user.id,
          consentType: 'NDPR_CONTACT',
          ipAddress,
          userAgent,
          granted: true,
        },
      })
    })
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      message: 'Database Error: Failed to Create Account.',
    }
  }

  // Redirect to login on successful registration
  redirect('/login?registered=true')
}
