
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, UserPlus, Trash2, Edit, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { UserForm } from '@/components/admin/user-form';
import type { UserRecord } from 'firebase-admin/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AppUser extends UserRecord {
    role?: string;
}


export default function UserManagementPage() {
    const [users, setUsers] = useState<AppUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isApiConfigured, setIsApiConfigured] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<AppUser | null>(null);
    const [actionType, setActionType] = useState<'add' | 'edit' | 'delete' | 'role' | null>(null);
    const { toast } = useToast();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/users');
            if (!response.ok) throw new Error('Failed to fetch users.');
            
            const data = await response.json();

            // The API returns an empty array with a special header if not configured.
            if (response.headers.get("X-Api-Not-Configured")) {
              setIsApiConfigured(false);
              setUsers([]);
            } else {
              setIsApiConfigured(true);
              const usersWithRoles = data.map((user: AppUser) => ({
                  ...user,
                  role: user.customClaims?.role || 'user',
                  lastLoginAt: user.metadata.lastSignInTime,
                  status: user.disabled ? 'Inactive' : 'Active',
              }));
              setUsers(usersWithRoles);
            }
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: (error as Error).message || 'Could not fetch users.',
            });
             setIsApiConfigured(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDialogSubmit = () => {
        setDialogOpen(false);
        fetchUsers(); // Refresh user list
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            const response = await fetch(`/api/users?uid=${selectedUser.uid}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete user.');
            }
            toast({ title: 'Success', description: 'User has been deleted.' });
            fetchUsers();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
        }
    };
    
    const handleChangeRole = async (newRole: 'user' | 'superadmin') => {
        if (!selectedUser) return;
        try {
            const response = await fetch(`/api/users?uid=${selectedUser.uid}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customClaims: { role: newRole }})
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to change role.');
            }
            toast({ title: 'Success', description: "User's role has been updated." });
            fetchUsers();
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
        }
    }


    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [users, searchTerm]
    );

    const openActionDialog = (user: AppUser, type: 'edit' | 'delete') => {
        setSelectedUser(user);
        if (type === 'delete') {
            setAlertDialogOpen(true);
        } else {
            setActionType(type);
            setDialogOpen(true);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">View, manage, and edit user accounts.</p>
                </div>
                <div className="flex items-center gap-4">
                    <Input placeholder="Search users..." className="w-64" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} disabled={!isApiConfigured} />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => { setActionType('add'); setSelectedUser(null); }} disabled={!isApiConfigured}>
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{actionType === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
                                <DialogDescription>
                                    {actionType === 'add' ? 'Enter the details for the new user.' : 'Update the details for the selected user.'}
                                </DialogDescription>
                            </DialogHeader>
                            <UserForm user={selectedUser} onFormSubmit={handleDialogSubmit} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {!isApiConfigured && !isLoading && (
              <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Action Required: API Not Configured</AlertTitle>
                  <AlertDescription>
                      The User Management API is not enabled because the `FIREBASE_SERVICE_ACCOUNT_KEY` environment variable is not set. To manage users, you must provide a valid service account key in your project's environment. See `README-ADMIN.md` for instructions.
                  </AlertDescription>
              </Alert>
            )}

            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Login</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={5}><Skeleton className="h-10 w-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                <TableRow key={user.uid}>
                                    <TableCell>
                                        <div className="font-medium">{user.displayName || 'N/A'}</div>
                                        <div className="text-sm text-muted-foreground">{user.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'superadmin' ? 'default' : 'secondary'}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'Active' ? 'outline' : 'destructive'} className={user.status === 'Active' ? 'border-green-600 text-green-600' : ''}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                        }) : 'Never'}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => openActionDialog(user, 'edit')}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleChangeRole(user.role === 'superadmin' ? 'user' : 'superadmin')}>
                                                    <Shield className="mr-2 h-4 w-4" /> Make {user.role === 'superadmin' ? 'User' : 'Admin'}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => openActionDialog(user, 'delete')}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">{isLoading ? 'Loading...' : 'No users found'}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user account for <span className="font-bold">{selectedUser?.email}</span>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            setAlertDialogOpen(false);
                            handleDelete();
                        }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
