'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { register } from '@/features/auth/actions/register'

export default function RegisterForm() {
  const [state, dispatch] = useActionState(register, undefined)

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">
          Create an Account
        </h1>
        <div className="w-full">
            <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
          
          {/* NDPR Consent Checkbox - Lagos Luxury styling with depth */}
          <div className="mt-6 p-4 rounded-lg bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="ndprConsent"
                name="ndprConsent"
                required
                className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 cursor-pointer"
              />
              <label
                htmlFor="ndprConsent"
                className="text-sm text-gray-700 cursor-pointer"
              >
                I agree to be contacted about my account and listings in accordance with the{' '}
                <a 
                  href="/privacy" 
                  className="text-primary-600 hover:text-primary-800 underline transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                . This consent is required per NDPR regulations.
              </label>
            </div>
          </div>
        </div>
        <RegisterButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
             <p className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>{state.message}</p>
          )}
        </div>
      </div>
    </form>
  )
}

function RegisterButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit"
      className="mt-4 w-full" 
      disabled={pending}
    >
      {pending ? 'Creating account...' : 'Register'}
    </button>
  )
}
