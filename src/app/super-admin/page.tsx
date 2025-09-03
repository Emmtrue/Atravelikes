
import { redirect } from 'next/navigation';

export default function SuperAdminPage() {
  // The main super admin page will redirect to the dashboard
  redirect('/super-admin/dashboard');
}
