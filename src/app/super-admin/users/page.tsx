
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration purposes
const initialUsers = [
  {
    id: 'usr_1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://picsum.photos/40/40?random=user1',
    signUpDate: '2024-05-01',
    status: 'Active',
    role: 'User',
    phone: '+1-202-555-0104'
  },
  {
    id: 'usr_2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://picsum.photos/40/40?random=user2',
    signUpDate: '2024-04-22',
    status: 'Active',
    role: 'User',
    phone: '+1-202-555-0159'
  },
  {
    id: 'usr_3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    avatar: 'https://picsum.photos/40/40?random=user3',
    signUpDate: '2024-04-15',
    status: 'Disabled',
    role: 'User',
    phone: '+1-202-555-0161'
  },
  {
    id: 'usr_4',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://picsum.photos/40/40?random=user4',
    signUpDate: '2024-03-30',
    status: 'Active',
    role: 'Super Admin',
    phone: '+1-202-555-0181'
  },
  {
    id: 'usr_5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    avatar: 'https://picsum.photos/40/40?random=user5',
    signUpDate: '2024-03-10',
    status: 'Active',
    role: 'User',
    phone: '+1-202-555-0113'
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const { toast } = useToast();

  const toggleUserStatus = (userId: string) => {
    setUsers(currentUsers =>
      currentUsers.map(user => {
        if (user.id === userId) {
          const newStatus = user.status === 'Active' ? 'Disabled' : 'Active';
          toast({
            title: `User ${newStatus}`,
            description: `${user.name}'s account has been ${newStatus.toLowerCase()}.`,
          });
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          View and manage all registered users on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            A list of all users. (Mock Data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sign-up Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                   <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === 'Active' ? 'secondary' : 'destructive'
                      }
                       className={
                        user.status === 'Active' ? 'border-green-300 bg-green-50 text-green-700' : 'border-red-300 bg-red-50 text-red-700'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.signUpDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={`/super-admin/users/${user.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/super-admin/users/${user.id}/edit`}>Edit User</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => toggleUserStatus(user.id)}
                          className={user.status === 'Active' ? 'text-destructive' : ''}
                        >
                          {user.status === 'Active' ? 'Disable User' : 'Enable User'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
