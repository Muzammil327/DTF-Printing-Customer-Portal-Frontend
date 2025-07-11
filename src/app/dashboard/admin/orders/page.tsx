
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Filter, Download, Package, Edit } from "lucide-react";
import Link from "next/link";

const ManageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all");

  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "John Smith",
      email: "john@example.com",
      date: "2024-01-15",
      files: 3,
      total: 89.97,
      status: "In Review",
      priority: "normal"
    },
    {
      id: "ORD-002",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      date: "2024-01-12",
      files: 1,
      total: 29.99,
      status: "printed",
      priority: "high"
    },
    {
      id: "ORD-003",
      customer: "Mike Davis",
      email: "mike@example.com",
      date: "2024-01-10",
      files: 5,
      total: 149.95,
      status: "shipped",
      priority: "urgent"
    },
    {
      id: "ORD-004",
      customer: "Emily Wilson",
      email: "emily@example.com",
      date: "2024-01-08",
      files: 2,
      total: 59.98,
      status: "completed",
      priority: "normal"
    },
    {
      id: "ORD-005",
      customer: "Alex Brown",
      email: "alex@example.com",
      date: "2024-01-05",
      files: 1,
      total: 39.99,
      status: "processing",
      priority: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "printed":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "processing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "in review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase().replace(" ", "").includes(statusFilter);
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  return (
    <Layout userType="admin">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Orders</h1>
          <p className="text-slate-600">View and manage all customer orders.</p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search orders, customers, or emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-48">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="inreview">In Review</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="printed">Printed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Orders ({filteredOrders.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Order ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Files</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Priority</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-900">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-slate-900">{order.customer}</p>
                          <p className="text-sm text-slate-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{order.date}</td>
                      <td className="py-4 px-4 text-slate-600">{order.files}</td>
                      <td className="py-4 px-4 font-medium text-slate-900">${order.total}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className={getPriorityColor(order.priority)}>
                          {order.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Select 
                          value={order.status.toLowerCase().replace(" ", "")} 
                          onValueChange={(value) => updateOrderStatus(order.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Badge variant="outline" className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inreview">In Review</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="printed">Printed</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
                <p className="text-slate-600">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria." 
                    : "No orders have been placed yet."
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManageOrders;
