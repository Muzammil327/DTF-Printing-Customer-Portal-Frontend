
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar, Package, DollarSign } from "lucide-react";

const CustomerProfile = () => {
  const customer = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    status: "active",
    joinDate: "2023-06-15",
    orders: 12,
    totalSpent: 1250.50
  };

  const recentOrders = [
    { id: "ORD-001", date: "2024-01-15", status: "completed", amount: 89.99 },
    { id: "ORD-002", date: "2024-01-10", status: "processing", amount: 125.50 },
    { id: "ORD-003", date: "2024-01-05", status: "shipped", amount: 67.25 }
  ];

  return (
    <Layout userType="admin">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Profile</h1>
          <p className="text-slate-600">View customer details and order history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{customer.name}</h2>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700">{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700">{customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-700">Joined {customer.joinDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{order.id}</p>
                        <p className="text-sm text-slate-600">{order.date}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{order.status}</Badge>
                        <span className="font-medium">${order.amount.toFixed(2)}</span>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-slate-900">{customer.orders}</p>
                    <p className="text-slate-600">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">${customer.totalSpent.toFixed(2)}</p>
                    <p className="text-slate-600">Total Spent</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    Send Email
                  </Button>
                  <Button className="w-full" variant="outline">
                    Edit Profile
                  </Button>
                  <Button className="w-full" variant="outline">
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
