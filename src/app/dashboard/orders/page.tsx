'use client';


import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Package, Filter } from "lucide-react";
import Link from "next/link";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      files: 3,
      fileNames: ["design-001.png", "logo-final.tiff", "artwork-v2.png"],
      total: 89.97,
      status: "In Review",
      estimatedCompletion: "2024-01-18"
    },
    {
      id: "ORD-002",
      date: "2024-01-12",
      files: 1,
      fileNames: ["simple-logo.png"],
      total: 29.99,
      status: "Printed",
      estimatedCompletion: "2024-01-16"
    },
    {
      id: "ORD-003",
      date: "2024-01-10",
      files: 5,
      fileNames: ["batch-001.tiff", "batch-002.tiff", "batch-003.tiff", "batch-004.tiff", "batch-005.tiff"],
      total: 149.95,
      status: "Shipped",
      trackingNumber: "1Z999AA1234567890"
    },
    {
      id: "ORD-004",
      date: "2024-01-08",
      files: 2,
      fileNames: ["custom-design.png", "variant-b.png"],
      total: 59.98,
      status: "Completed",
      completedDate: "2024-01-12"
    },
    {
      id: "ORD-005",
      date: "2024-01-05",
      files: 1,
      fileNames: ["emergency-print.tiff"],
      total: 39.99,
      status: "Processing",
      estimatedCompletion: "2024-01-17"
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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.fileNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase().replace(" ", "").includes(statusFilter);
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout userType="customer">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Orders</h1>
          <p className="text-slate-600">Track and manage all your printing orders in one place.</p>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search orders or files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
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
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{order.id}</h3>
                        <p className="text-sm text-slate-500">Ordered on {order.date}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Files ({order.files})</p>
                        <div className="space-y-1">
                          {order.fileNames.slice(0, 2).map((fileName, index) => (
                            <p key={index} className="text-sm font-medium text-slate-900 truncate">
                              {fileName}
                            </p>
                          ))}
                          {order.files > 2 && (
                            <p className="text-sm text-slate-500">
                              +{order.files - 2} more files
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-slate-600 mb-1">Order Details</p>
                        <p className="text-lg font-bold text-slate-900">${order.total}</p>
                        {order.estimatedCompletion && (
                          <p className="text-sm text-slate-500">
                            Est. completion: {order.estimatedCompletion}
                          </p>
                        )}
                        {order.completedDate && (
                          <p className="text-sm text-green-600">
                            Completed: {order.completedDate}
                          </p>
                        )}
                        {order.trackingNumber && (
                          <p className="text-sm text-blue-600">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    {order.status === "Shipped" && (
                      <Button variant="outline" className="w-full sm:w-auto">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria." 
                  : "You haven't placed any orders yet. Start by uploading your artwork!"
                }
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link href="/upload">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upload Artwork
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
