
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Palette, Database } from "lucide-react";

const SettingsPage = () => {
  return (
    <Layout userType="admin">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your application settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg bg-blue-50 text-blue-700">
                    <Settings className="h-4 w-4" />
                    <span>General</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg text-slate-600 hover:bg-slate-100">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg text-slate-600 hover:bg-slate-100">
                    <Shield className="h-4 w-4" />
                    <span>Security</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg text-slate-600 hover:bg-slate-100">
                    <Palette className="h-4 w-4" />
                    <span>Appearance</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg text-slate-600 hover:bg-slate-100">
                    <Database className="h-4 w-4" />
                    <span>Data</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="DTF Print Hub" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" type="email" defaultValue="admin@dtfprinthub.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    defaultValue="Professional DTF printing services for businesses and individuals"
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="openTime">Opening Time</Label>
                      <Input id="openTime" type="time" defaultValue="09:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="closeTime">Closing Time</Label>
                      <Input id="closeTime" type="time" defaultValue="17:00" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoBackup">Automatic Backups</Label>
                        <p className="text-sm text-slate-600">Enable daily automatic backups</p>
                      </div>
                      <Switch id="autoBackup" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-slate-600">Send email notifications for new orders</p>
                      </div>
                      <Switch id="emailNotifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-slate-600">Temporarily disable user access</p>
                      </div>
                      <Switch id="maintenanceMode" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
