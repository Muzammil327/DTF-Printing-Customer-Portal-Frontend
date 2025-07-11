'use client';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Package, 
  DollarSign, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
} from "lucide-react";
import Link from "next/link";

const AdminDashboard = () => {
  // Sample data
  const stats = {
    totalCustomers: 1247,
    customersChange: +12,
    ordersToday: 23,
    ordersChange: +5,
    revenueMonth: 15420,
    revenueChange: +8.2,
    pendingBalances: 2340,
    balancesChange: -3.1
  };

  const recentOrders = [
    { id: "ORD-156", customer: "John Smith", files: 3, total: 89.97, status: "In Review", date: "2 hours ago" },
    { id: "ORD-155", customer: "Sarah Johnson", files: 1, total: 29.99, status: "Printed", date: "4 hours ago" },
    { id: "ORD-154", customer: "Mike Davis", files: 5, total: 149.95, status: "Processing", date: "6 hours ago" },
    { id: "ORD-153", customer: "Emily Wilson", files: 2, total: 59.98, status: "Shipped", date: "8 hours ago" },
  ];

  const recentUploads = [
    { id: 1, customer: "Alex Brown", file: "logo-design.png", size: "2.1 MB", status: "Processing", time: "10 min ago" },
    { id: 2, customer: "Lisa Chen", file: "artwork-final.tiff", size: "4.8 MB", status: "Approved", time: "25 min ago" },
    { id: 3, customer: "David Taylor", file: "print-ready.png", size: "1.7 MB", status: "Review", time: "1 hour ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "shipped":
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "processing":
      case "printed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "in review":
      case "review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = "", suffix = "" }:{
    title: string;
    value: number | string;
    change: number;
    icon: React.ElementType;
    prefix?: string;
    suffix?: string;
  }) => (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </p>
            <div className="flex items-center mt-2">
              {change > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-slate-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout userType="admin">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Overview of your DTF printing business operations.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            change={stats.customersChange}
            icon={Users}
          />
          <StatCard
            title="Orders Today"
            value={stats.ordersToday}
            change={stats.ordersChange}
            icon={Package}
          />
          <StatCard
            title="Revenue This Month"
            value={stats.revenueMonth}
            change={stats.revenueChange}
            icon={DollarSign}
            prefix="$"
          />
          <StatCard
            title="Pending Balances"
            value={stats.pendingBalances}
            change={stats.balancesChange}
            icon={CreditCard}
            prefix="$"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-slate-900">{order.id}</span>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-500">
                        {order.files} files • ${order.total} • {order.date}
                      </p>
                    </div>
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent File Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div key={upload.id} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-50">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {upload.file}
                      </p>
                      <p className="text-xs text-slate-500">
                        {upload.customer} • {upload.size} • {upload.time}
                      </p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(upload.status)}>
                      {upload.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg xl:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/admin/orders" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Package className="h-6 w-6" />
                    <span className="text-sm">Manage Orders</span>
                  </Button>
                </Link>
                <Link href="/admin/customers" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">View Customers</span>
                  </Button>
                </Link>
                <Link href="/admin/reports" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                </Link>
                <Link href="/admin/settings" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Download className="h-6 w-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
