
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/auth/login-form';

export default function SuperAdminLoginPage() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <LoginForm isAdminLogin={true} />
    </div>
  );
}
