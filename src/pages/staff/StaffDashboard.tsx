
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Package, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Eye,
  Printer,
  Users
} from "lucide-react";

const StaffDashboard = () => {
  // Sample data for staff view
  const todayStats = {
    ordersToProcess: 12,
    ordersInProduction: 8,
    ordersCompleted: 15,
    filesReviewed: 23
  };

  const ordersToProcess = [
    { id: "ORD-156", customer: "John Smith", files: 3, priority: "high", submitted: "2 hours ago" },
    { id: "ORD-155", customer: "Sarah Johnson", files: 1, priority: "normal", submitted: "4 hours ago" },
    { id: "ORD-154", customer: "Mike Davis", files: 5, priority: "urgent", submitted: "6 hours ago" },
    { id: "ORD-153", customer: "Emily Wilson", files: 2, priority: "normal", submitted: "8 hours ago" },
  ];

  const ordersInProduction = [
    { id: "ORD-150", customer: "Alex Brown", files: 2, stage: "printing", startTime: "1 hour ago" },
    { id: "ORD-149", customer: "Lisa Chen", files: 4, stage: "quality_check", startTime: "3 hours ago" },
    { id: "ORD-148", customer: "David Taylor", files: 1, stage: "printing", startTime: "5 hours ago" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-50 text-red-700 border-red-200";
      case "high":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "printing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "quality_check":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = "text-blue-600" }) => (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout userType="staff">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Production Dashboard</h1>
          <p className="text-slate-600">Manage orders and production workflow.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Orders to Process"
            value={todayStats.ordersToProcess}
            icon={AlertCircle}
            color="text-orange-600"
          />
          <StatCard
            title="In Production"
            value={todayStats.ordersInProduction}
            icon={Printer}
            color="text-blue-600"
          />
          <StatCard
            title="Completed Today"
            value={todayStats.ordersCompleted}
            icon={CheckCircle}
            color="text-green-600"
          />
          <StatCard
            title="Files Reviewed"
            value={todayStats.filesReviewed}
            icon={Package}
            color="text-purple-600"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Orders to Process */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>Orders Awaiting Review</span>
              </CardTitle>
              <Link to="/admin/orders">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ordersToProcess.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-slate-900">{order.id}</span>
                        <Badge variant="outline" className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-500">
                        {order.files} files • Submitted {order.submitted}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Process
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Orders in Production */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Printer className="h-5 w-5 text-blue-600" />
                <span>Currently in Production</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ordersInProduction.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-slate-900">{order.id}</span>
                        <Badge variant="outline" className={getStageColor(order.stage)}>
                          {order.stage.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-500">
                        {order.files} files • Started {order.startTime}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Update
                      </Button>
                      {order.stage === "quality_check" && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Complete
                        </Button>
                      )}
                    </div>
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
                <Link to="/admin/orders?status=review" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="h-6 w-6" />
                    <span className="text-sm">Review Queue</span>
                  </Button>
                </Link>
                <Link to="/admin/orders?status=production" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Printer className="h-6 w-6" />
                    <span className="text-sm">Production</span>
                  </Button>
                </Link>
                <Link to="/admin/orders?status=completed" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <CheckCircle className="h-6 w-6" />
                    <span className="text-sm">Completed</span>
                  </Button>
                </Link>
                <Link to="/admin/orders" className="block">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Package className="h-6 w-6" />
                    <span className="text-sm">All Orders</span>
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

export default StaffDashboard;
