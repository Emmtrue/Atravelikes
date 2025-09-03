
import { redirect } from 'next/navigation';

export default function ProfilePage() {
  // The main profile page will redirect to the dashboard.
  redirect('/profile/dashboard');
}
