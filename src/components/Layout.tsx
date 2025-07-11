
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Upload, 
  Package, 
  CreditCard, 
  Bell, 
  Users, 
  Settings, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  User,
  UserCheck
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  userType?: "customer" | "admin" | "staff";
}

export const Layout = ({ children, userType = "customer" }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = usePathname();
  const router = useRouter();

  const customerNavItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Upload, label: "Upload Artwork", path: "/upload" },
    { icon: Package, label: "My Orders", path: "/orders" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  const adminNavItems = [
    { icon: Home, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: UserCheck, label: "Staff", path: "/admin/staff" },
    { icon: Package, label: "Orders", path: "/admin/orders" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const staffNavItems = [
    { icon: Home, label: "Dashboard", path: "/staff/dashboard" },
    { icon: Package, label: "Orders", path: "/admin/orders" },
  ];

  const getNavItems = () => {
    switch (userType) {
      case "admin": return adminNavItems;
      case "staff": return staffNavItems;
      default: return customerNavItems;
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    router.push("/");
  };

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path} as ${userType}`);
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-600">DTF Print Hub</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <button 
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-2 text-left"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-slate-800">DTF Print Hub</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  John Doe
                </p>
                <p className="text-xs text-slate-500 capitalize">{userType}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
