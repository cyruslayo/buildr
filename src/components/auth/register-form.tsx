/**
 * Registration Form Component
 * @fileoverview User registration form with validation
 * 
 * "use client" - Uses React Hook Form, form events, and state
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Validation schema with NDPR consent
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  ndprConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to be contacted to create an account.',
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      ndprConsent: false,
    },
  });

  const ndprConsent = watch('ndprConsent');

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Registration failed');
        return;
      }

      onSuccess?.();
      router.push('/login?registered=true');
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          data-testid="name-input"
          placeholder="John Doe"
          {...register('name')}
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          data-testid="email-input"
          placeholder="you@example.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          data-testid="password-input"
          placeholder="At least 8 characters"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* NDPR Consent Checkbox - Lagos Luxury styling with depth */}
      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-start gap-3">
          <Checkbox
            id="ndprConsent"
            checked={ndprConsent}
            onCheckedChange={(checked) => setValue('ndprConsent', checked === true)}
            disabled={isLoading}
            className="mt-1"
          />
          <Label
            htmlFor="ndprConsent"
            className="text-sm text-slate-700 cursor-pointer font-normal"
          >
            I agree to be contacted about my account and listings in accordance with the{' '}
            <Link 
              href="/privacy" 
              className="text-emerald-700 hover:text-emerald-800 underline transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            . This consent is required per NDPR regulations.
          </Label>
        </div>
        {errors.ndprConsent && (
          <p className="text-sm text-red-500 mt-2">{errors.ndprConsent.message}</p>
        )}
      </div>

      {error && (
        <div data-testid="register-error" className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        data-testid="register-button"
        className="w-full"
        isLoading={isLoading}
      >
        Sign Up
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
