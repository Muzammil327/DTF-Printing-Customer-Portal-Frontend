
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, DollarSign, Users, Package, Download } from "lucide-react";

const ReportsPage = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+8%",
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Customers",
      value: "567",
      change: "+15%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Growth Rate",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <Layout userType="admin">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
          <p className="text-slate-600">View business performance and analytics</p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select defaultValue="last30days">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="lastyear">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last period</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === "text-green-600" ? "bg-green-100" :
                    stat.color === "text-blue-600" ? "bg-blue-100" :
                    stat.color === "text-purple-600" ? "bg-purple-100" :
                    "bg-orange-100"
                  }`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Revenue Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <p>Chart visualization would go here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Custom T-Shirt Design", orders: 234, revenue: "$4,567" },
                  { name: "Logo Transfer", orders: 189, revenue: "$3,456" },
                  { name: "Hoodie Print", orders: 156, revenue: "$2,890" },
                  { name: "Vinyl Stickers", orders: 123, revenue: "$1,234" }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-sm text-slate-600">{product.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{product.revenue}</p>
                    </div>
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

export default ReportsPage;
