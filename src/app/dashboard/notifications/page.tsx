'use client';


import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Package, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  Trash2,
  Check
} from "lucide-react";

const Page = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order_completed",
      title: "Order Completed",
      message: "Your order ORD-002 has been completed and is ready for pickup.",
      date: "2024-01-15 14:30",
      read: false,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment Received",
      message: "We've received your payment of $89.97 for order ORD-001.",
      date: "2024-01-15 10:15",
      read: false,
      icon: CreditCard,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "order_shipped",
      title: "Order Shipped",
      message: "Your order ORD-003 has been shipped. Tracking: 1Z999AA1234567890",
      date: "2024-01-14 16:45",
      read: true,
      icon: Package,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "file_issue",
      title: "File Quality Issue",
      message: "File 'logo-design.png' needs attention. DPI is too low for quality printing.",
      date: "2024-01-14 09:20",
      read: false,
      icon: AlertCircle,
      color: "text-orange-600"
    },
    {
      id: 5,
      type: "order_processing",
      title: "Order In Production",
      message: "Your order ORD-001 is now in production. Expected completion: Jan 18.",
      date: "2024-01-13 11:30",
      read: true,
      icon: Package,
      color: "text-blue-600"
    },
    {
      id: 6,
      type: "payment_received",
      title: "Balance Added",
      message: "Successfully added $100.00 to your account balance.",
      date: "2024-01-12 13:45",
      read: true,
      icon: CreditCard,
      color: "text-green-600"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationBg = (read: boolean) => {
    return read ? "bg-white" : "bg-blue-50 border-blue-200";
  };

  return (
    <Layout userType="customer">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Notifications</h1>
              <p className="text-slate-600">Stay updated on your orders and account activity.</p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Notifications</p>
                  <p className="text-2xl font-bold text-slate-900">{notifications.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bell className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Unread</p>
                  <p className="text-2xl font-bold text-slate-900">{unreadCount}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Read</p>
                  <p className="text-2xl font-bold text-slate-900">{notifications.length - unreadCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No notifications</h3>
                <p className="text-slate-600">You&apos;re all caught up! New notifications will appear here.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-colors ${getNotificationBg(notification.read)}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          notification.read ? "bg-slate-100" : "bg-white"
                        }`}>
                          <IconComponent className={`h-5 w-5 ${notification.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-slate-900">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-slate-600 text-sm mb-2">{notification.message}</p>
                          <p className="text-xs text-slate-500">{notification.date}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Mark as read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Page;
