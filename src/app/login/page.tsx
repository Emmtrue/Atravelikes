
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login-form';

function LoginPageContent() {
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPageContent />
      </Suspense>
    </div>
  );
}
