
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Switch } from "../ui/switch";
import { UserRecord } from "firebase-admin/auth";
import { v4 as uuidv4 } from 'uuid';

const FormSchema = z.object({
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().optional(),
  disabled: z.boolean().default(false),
}).refine(data => !data.password || data.password.length >= 6, {
    message: "Password must be at least 6 characters long.",
    path: ["password"],
});

interface UserFormProps {
    user?: UserRecord | null;
    onFormSubmit: () => void;
}

export function UserForm({ user, onFormSubmit }: UserFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!user;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      password: "",
      disabled: user?.disabled || false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    const apiUrl = isEditMode ? `/api/users?uid=${user.uid}` : '/api/users';
    const method = isEditMode ? 'PUT' : 'POST';

    // Don't send empty password field on edit
    const payload:any = {...data};
    if (isEditMode && !payload.password) {
        delete payload.password;
    } else if (!isEditMode && !payload.password) {
        // Generate a random password if not provided for a new user
        payload.password = uuidv4();
    }


    try {
      const response = await fetch(apiUrl, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred');
      }

      toast({
        title: "Success!",
        description: `User has been successfully ${isEditMode ? 'updated' : 'created'}.`,
      });
      onFormSubmit();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: (error as Error).message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder={isEditMode ? "Leave blank to keep current password" : "Optional, will be auto-generated"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="disabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <FormLabel>Disable Account</FormLabel>
                    <p className="text-[0.8rem] text-muted-foreground">
                        A disabled account cannot be logged into.
                    </p>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (isEditMode ? 'Saving...' : 'Creating...') : (isEditMode ? 'Save Changes' : 'Create User')}
        </Button>
      </form>
    </Form>
  )
}
