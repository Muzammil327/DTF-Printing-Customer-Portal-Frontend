'use client';

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Package, 
  Upload, 
  Eye, 
  Clock,
  CheckCircle,
  AlertCircle,
  Image,
  TrendingUp,
  Activity,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const CustomerDashboard = () => {
  // Sample data
  const recentUploads = [
    { id: 1, name: "design-001.png", date: "2024-01-15", size: "1.2 MB", status: "processed", statusColor: "bg-green-500" },
    { id: 2, name: "logo-final.tiff", date: "2024-01-14", size: "3.4 MB", status: "processing", statusColor: "bg-blue-500" },
    { id: 3, name: "artwork-v2.png", date: "2024-01-13", size: "2.1 MB", status: "completed", statusColor: "bg-green-500" },
  ];

  const recentOrders = [
    { id: "ORD-001", date: "Jan 15, 2024", files: 3, total: 89.97, status: "In Review", statusColor: "bg-yellow-500" },
    { id: "ORD-002", date: "Jan 12, 2024", files: 1, total: 29.99, status: "Printed", statusColor: "bg-purple-500" },
    { id: "ORD-003", date: "Jan 10, 2024", files: 5, total: 149.95, status: "Shipped", statusColor: "bg-blue-500" },
  ];

  const recentPayments = [
    { id: 1, date: "Jan 15, 2024", amount: 89.97, method: "Credit Card", type: "charge" },
    { id: 2, date: "Jan 12, 2024", amount: 29.99, method: "PayPal", type: "charge" },
    { id: 3, date: "Jan 8, 2024", amount: 75.00, method: "Account Credit", type: "credit" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "shipped":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "processing":
      case "printed":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "in review":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const summaryCards = [
    {
      title: "Current Balance",
      value: "$125.50",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      delay: "0ms"
    },
    {
      title: "Orders in Progress",
      value: "3",
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      delay: "100ms"
    },
    {
      title: "Uploaded Artwork",
      value: "12",
      icon: Upload,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      delay: "200ms"
    }
  ];

  return (
    <Layout userType="customer">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8 fade-in-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-modern">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Welcome back, John!
              </h1>
              <p className="text-slate-600">Here&apos;s what&apos;s happening with your printing projects.</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card 
                key={index} 
                className="card-modern card-hover group fade-in-up" 
                style={{animationDelay: card.delay}}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">{card.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                      <div className="flex items-center mt-2 text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+12% from last month</span>
                      </div>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center shadow-modern group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Uploads */}
          <Card className="card-modern shadow-modern slide-in-left">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Upload className="h-5 w-5 text-purple-600" />
                <span>Recent Uploads</span>
              </CardTitle>
              <Link href="/dashboard/upload">
                <Button size="sm" className="gradient-primary btn-modern">
                  Upload New
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUploads.map((upload, index) => (
                  <div 
                    key={upload.id} 
                    className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Image className="h-5 w-5 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {upload.name}
                        </p>
                        <div className={`status-dot ${upload.status === 'completed' ? 'active' : upload.status === 'processing' ? 'pending' : 'active'}`}></div>
                      </div>
                      <p className="text-xs text-slate-500">
                        {upload.date} • {upload.size}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(upload.status)}
                      <Badge variant="outline" className="bg-white/50">
                        {upload.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link href="/dashboard/upload" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group">
                  View all uploads
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Tracker */}
          <Card className="card-modern shadow-modern slide-in-right">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>Recent Orders</span>
              </CardTitle>
              <Link href="/dashboard/orders">
                <Button variant="outline" size="sm" className="bg-white/50 border-white/30 btn-modern">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div 
                    key={order.id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${order.statusColor} animate-pulse`}></div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{order.id}</p>
                        <p className="text-xs text-slate-500">
                          {order.date} • {order.files} files
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">
                        ${order.total}
                      </p>
                      <Badge variant="outline" className="bg-white/50 text-xs">
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link href="/dashboard/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center group">
                  View order history
                  <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Payment History Summary */}
          <Card className="card-modern shadow-modern lg:col-span-2 fade-in-up" style={{animationDelay: '300ms'}}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <Link href="/payments">
                <Button variant="outline" size="sm" className="bg-white/50 border-white/30 btn-modern">
                  View All Payments
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayments.map((payment, index) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors group"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        payment.type === 'credit' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        <DollarSign className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {payment.type === 'credit' ? 'Balance Added' : 'Payment Processed'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {payment.date} • {payment.method}
                        </p>
                      </div>
                    </div>
                    <p className={`text-sm font-semibold ${
                      payment.type === 'credit' 
                        ? 'text-green-600' 
                        : 'text-blue-600'
                    }`}>
                      {payment.type === 'credit' ? '+' : ''}${payment.amount}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
