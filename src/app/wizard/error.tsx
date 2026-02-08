'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container max-w-2xl mx-auto p-4 min-h-[100dvh] flex flex-col justify-center">
      <Card className="border-destructive/20 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-6 h-6" />
            <CardTitle className="text-xl font-bold">Something went wrong!</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We encountered an error while managing your property wizard. Your draft is likely still safe in local storage.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-muted rounded text-xs overflow-auto max-h-[200px]">
              {error.message}
            </pre>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => reset()} className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
