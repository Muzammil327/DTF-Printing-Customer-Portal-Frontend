'use client';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Package, CheckCircle, Clock, AlertCircle, Image } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const OrderDetails = () => {
  const { orderId } = useParams();

  // Sample order data
  const order = {
    id: orderId || "ORD-001",
    date: "2024-01-15",
    status: "Printed",
    total: 89.97,
    subtotal: 84.97,
    processingFee: 5.00,
    estimatedCompletion: "2024-01-18",
    files: [
      {
        id: 1,
        name: "design-001.png",
        size: "1.2 MB",
        dimensions: "1200x800px",
        dpi: 300,
        price: 29.99,
        status: "completed",
        preview: "/placeholder.svg"
      },
      {
        id: 2,
        name: "logo-final.tiff",
        size: "3.4 MB",
        dimensions: "2400x1600px",
        dpi: 350,
        price: 34.99,
        status: "completed",
        preview: "/placeholder.svg"
      },
      {
        id: 3,
        name: "artwork-v2.png",
        size: "2.1 MB",
        dimensions: "1800x1200px",
        dpi: 300,
        price: 19.99,
        status: "printing",
        preview: "/placeholder.svg"
      }
    ],
    timeline: [
      {
        id: 1,
        title: "Order Placed",
        description: "Your order has been received and is being reviewed",
        date: "2024-01-15 10:30 AM",
        status: "completed"
      },
      {
        id: 2,
        title: "Quality Check",
        description: "Files reviewed and approved for printing",
        date: "2024-01-15 2:15 PM",
        status: "completed"
      },
      {
        id: 3,
        title: "In Production",
        description: "Your designs are currently being printed",
        date: "2024-01-16 9:00 AM",
        status: "current"
      },
      {
        id: 4,
        title: "Quality Control",
        description: "Final inspection before packaging",
        date: "Expected: 2024-01-17",
        status: "pending"
      },
      {
        id: 5,
        title: "Shipped",
        description: "Package shipped and tracking information provided",
        date: "Expected: 2024-01-18",
        status: "pending"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "printing":
      case "current":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-slate-50 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "current":
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  return (
    <Layout userType="customer">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Order {order.id}</h1>
              <p className="text-slate-600">Placed on {order.date}</p>
            </div>
            <Badge variant="outline" className={`${getStatusColor(order.status)} text-lg px-4 py-2`}>
              {order.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Files */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Order Files ({order.files.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.files.map((file) => (
                    <div key={file.id} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200">
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {file.name}
                          </p>
                          <Badge variant="outline" className={getStatusColor(file.status)}>
                            {file.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>{file.size}</span>
                          <span>{file.dimensions}</span>
                          <span className="text-green-600">{file.dpi} DPI</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          ${file.price.toFixed(2)}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.timeline.map((step, index) => (
                    <div key={step.id} className="flex space-x-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                          step.status === "completed" 
                            ? "bg-green-50 border-green-200" 
                            : step.status === "current"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-slate-50 border-slate-200"
                        }`}>
                          {getTimelineIcon(step.status)}
                        </div>
                        {index < order.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${
                            step.status === "completed" ? "bg-green-200" : "bg-slate-200"
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className={`font-medium ${
                          step.status === "completed" 
                            ? "text-green-900" 
                            : step.status === "current"
                            ? "text-blue-900"
                            : "text-slate-600"
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                        <p className="text-xs text-slate-500 mt-2">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal:</span>
                    <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Processing fee:</span>
                    <span className="font-medium">${order.processingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-900">Total:</span>
                      <span className="font-bold text-slate-900">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
                {order.status === "Shipped" && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Track Package
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Estimated Completion */}
            {order.estimatedCompletion && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-1">Estimated completion</p>
                    <p className="font-semibold text-slate-900">{order.estimatedCompletion}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
