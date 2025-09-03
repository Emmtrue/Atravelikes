import { AdminPanel } from './admin-panel';

export const dynamic = 'force-dynamic';

export default function WebsiteManagementPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Seed Website Management</h1>
        <p className="text-muted-foreground">
          Manage the list of seed websites for the automated flight data scraper.
        </p>
      </div>
      <AdminPanel />
    </div>
  );
}
