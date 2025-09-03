
'use client';

import React from 'react';
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Calendar, User, ArrowLeft, Briefcase, Edit, Phone, Shield } from "lucide-react";

// Mock function to get user data by ID
const getUserById = (id: string) => {
  // In a real app, this would be a database call.
  return {
    id: id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/40/40?random=user1',
    signUpDate: '2024-05-01',
    status: 'Active',
    lastLogin: '2024-07-20',
    totalBookings: 5,
    phone: '+1-202-555-0104',
    role: 'User'
  };
}

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const user = getUserById(React.use(params).id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/super-admin/users">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to users</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">User Details</h1>
        <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'}  className={user.status === 'Active' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'}>{user.status}</Badge>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                     <CardTitle>Profile</CardTitle>
                     <Button variant="ghost" size="icon" asChild>
                        <Link href={`/super-admin/users/${user.id}/edit`}>
                            <Edit className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground truncate w-full">{user.email}</p>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>User Information</CardTitle>
                    <CardDescription>Key details about the user's account and activity.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Email Address</p>
                            <p className="text-sm font-medium truncate">{user.email}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Phone Number</p>
                            <p className="text-sm font-medium">{user.phone}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Role</p>
                            <p className="text-sm font-medium">{user.role}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Sign-up Date</p>
                            <p className="text-sm font-medium">{new Date(user.signUpDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                      <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Last Login</p>
                            <p className="text-sm font-medium">{new Date(user.lastLogin).toLocaleDateString()}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 p-3 rounded-lg border">
                        <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-xs text-muted-foreground">Total Bookings</p>
                            <p className="text-sm font-medium">{user.totalBookings}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
