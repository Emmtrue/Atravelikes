import { ScraperPanel } from './scraper-panel';

export const dynamic = 'force-dynamic';

export default function ScraperPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Scraper Control Panel</h1>
        <p className="text-muted-foreground">
          Run manual scrapes for a single URL or trigger an automated scrape of all seed websites.
        </p>
      </div>
      <ScraperPanel />
    </div>
  );
}
