'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', success: 40, failed: 2 },
  { name: 'Tue', success: 30, failed: 5 },
  { name: 'Wed', success: 50, failed: 1 },
  { name: 'Thu', success: 27, failed: 3 },
  { name: 'Fri', success: 60, failed: 8 },
  { name: 'Sat', success: 45, failed: 4 },
  { name: 'Sun', success: 55, failed: 0 },
];

export function ScraperActivityChart() {
  return (
    <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{
                    background: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                }}
            />
            <Legend iconSize={10} />
            <Bar dataKey="success" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}
