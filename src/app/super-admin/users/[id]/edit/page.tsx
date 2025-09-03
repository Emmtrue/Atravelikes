
'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


// Mock function to get user data by ID
const getUserById = (id: string) => {
  // In a real app, this would be a database call.
  return {
    id: id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    role: 'User',
    phone: '+1-202-555-0104'
  };
}

export default function EditUserPage({ params }: { params: { id: string } }) {
  const user = getUserById(params.id);
  const { toast } = useToast();
  const router = useRouter();

  const handleSaveChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, this would submit to an API
    toast({
        title: "User Updated",
        description: `${user.name}'s details have been saved.`,
    });
    router.push(`/super-admin/users/${user.id}`);
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href={`/super-admin/users/${user.id}`}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to user details</span>
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit User</h1>
      </div>

      <form onSubmit={handleSaveChanges}>
        <Card>
          <CardHeader>
            <CardTitle>Edit {user.name}</CardTitle>
            <CardDescription>Update the user's information below.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue={user.phone} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={user.role}>
                    <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="status">Account Status</Label>
                <Select defaultValue={user.status}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
           <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
