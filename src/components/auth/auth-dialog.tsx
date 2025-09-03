
'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './sign-in-form';
import { SignUpForm } from './sign-up-form';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'sign-in' | 'sign-up';
}

export function AuthDialog({ open, onOpenChange, defaultTab = 'sign-in' }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (open) {
      setActiveTab(defaultTab);
    }
  }, [open, defaultTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">{activeTab === 'sign-in' ? 'Welcome Back' : 'Create an Account'}</DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'sign-in' ? "Sign in to access your account." : "Enter your details to get started."}
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sign-in' | 'sign-up')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm onSignIn={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm onSignUp={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
