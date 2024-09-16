import StockDashboard from '@/components/StockDashboard';

export default function DashboardPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <h1 className="text-3xl font-bold mb-6">Stock Dashboard</h1>
      <StockDashboard />
    </div>
  );
}
