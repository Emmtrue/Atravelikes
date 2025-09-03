import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Globe,
  Menu,
  Package2,
  Search,
  Users,
  Eye,
  Settings,
  PlusCircle,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScraperActivityChart } from './scraper-activity-chart';

const FALLBACK_SEED_WEBSITES = [
    'trip.com', 'expedia.com', 'skyscanner.com', 'kayak.com', 'momondo.com', 'google.com/flights',
    'cheapflights.com', 'aviasales.com', 'edreams.com', 'opodo.com', 'flightsfinder.com', 'flightconnections.com',
    'hopper.com', 'secretflying.com', 'airfarewatchdog.com', 'flightmatrix.com', 'booking.com', 'priceline.com',
    'hotwire.com', 'going.com', 'cheapoair.com', 'tripadvisor.com', 'flightradar24.com', 'flightaware.com',
    'flightstats.com', 'travelocity.com', 'orbitz.com', 'airasia.com', 'ryanair.com', 'easyjet.com',
    'southwest.com', 'klm.com', 'emirates.com', 'flydubai.com', 'qatarairways.com',
];

export default function DashboardPage() {
    const totalWebsites = FALLBACK_SEED_WEBSITES.length;

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
         <div className="mb-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">A high-level overview of your application's data.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Seed Websites
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWebsites}</div>
              <p className="text-xs text-muted-foreground">
                Currently in the auto-scraper list
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Scraped Flights
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+25</div>
              <p className="text-xs text-muted-foreground">
                in the last hour (mock data)
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Scraped Hotels</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">
                in the last hour (mock data)
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actions</CardTitle>
               <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Link href="/super-admin/website-management">
                    <Button size="sm" className="w-full">Manage Sites</Button>
                </Link>
                 <Link href="/super-admin/scraper">
                    <Button size="sm" variant="outline" className="w-full">Go to Scraper</Button>
                </Link>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Scraper Activity</CardTitle>
              <CardDescription>
                A visual summary of recent scraping tasks. (Mock Data)
              </CardDescription>
            </CardHeader>
            <CardContent>
                <ScraperActivityChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Manual Scrapes</CardTitle>
              <CardDescription>
                Latest single-URL scrapes. (Mock Data)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Website</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">expedia.com</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        1 minute ago
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Badge variant="secondary">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">kayak.com</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        5 minutes ago
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant="secondary">Success</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">some-other-site.com</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        12 minutes ago
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <Badge variant="destructive">Failed</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
