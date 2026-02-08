'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}
