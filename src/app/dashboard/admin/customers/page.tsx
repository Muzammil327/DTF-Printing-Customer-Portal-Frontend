import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Plus, Mail, Phone, Edit, DollarSign } from "lucide-react";
import { PricingManager } from "@/components/PricingManager";

const ManageCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPricingDialogOpen, setIsPricingDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMode: "pre-pay",
    status: "active",
    pricingTier: "standard"
  });

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8901",
      status: "active",
      orders: 12,
      totalSpent: 1250.50,
      paymentMode: "pre-pay",
      pricingTier: "standard"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234 567 8902",
      status: "active",
      orders: 8,
      totalSpent: 890.25,
      paymentMode: "post-pay",
      pricingTier: "premium"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phone: "+1 234 567 8903",
      status: "inactive",
      orders: 3,
      totalSpent: 234.75,
      paymentMode: "pre-pay",
      pricingTier: "standard"
    }
  ];

  const handleAddCustomer = () => {
    console.log("Adding new customer:", newCustomer);
    setNewCustomer({ name: "", email: "", phone: "", paymentMode: "pre-pay", status: "active", pricingTier: "standard" });
    setIsDialogOpen(false);
  };

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer(customer);
    setNewCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleUpdateCustomer = () => {
    console.log("Updating customer:", newCustomer);
    setEditingCustomer(null);
    setNewCustomer({ name: "", email: "", phone: "", paymentMode: "pre-pay", status: "active", pricingTier: "standard" });
    setIsDialogOpen(false);
  };

  const handleManagePricing = (customer: any) => {
    setSelectedCustomer(customer);
    setIsPricingDialogOpen(true);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout userType="admin">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Customers</h1>
          <p className="text-slate-600">View and manage customer accounts</p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingCustomer ? "Edit Customer" : "Add New Customer"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="paymentMode">Payment Mode</Label>
                  <Select value={newCustomer.paymentMode} onValueChange={(value) => setNewCustomer({ ...newCustomer, paymentMode: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-pay">Pre-pay</SelectItem>
                      <SelectItem value="post-pay">Post-pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pricingTier">Pricing Tier</Label>
                  <Select value={newCustomer.pricingTier} onValueChange={(value) => setNewCustomer({ ...newCustomer, pricingTier: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newCustomer.status} onValueChange={(value) => setNewCustomer({ ...newCustomer, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingCustomer(null);
                  setNewCustomer({ name: "", email: "", phone: "", paymentMode: "pre-pay", status: "active", pricingTier: "standard" });
                }}>
                  Cancel
                </Button>
                <Button onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
                  {editingCustomer ? "Update" : "Add"} Customer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Customer List</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{customer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{customer.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {customer.paymentMode}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {customer.pricingTier}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{customer.orders} orders</p>
                      <p className="text-sm text-slate-600">${customer.totalSpent.toFixed(2)}</p>
                    </div>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleManagePricing(customer)}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Pricing
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCustomer(customer)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pricing Management Dialog */}
        <Dialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Manage Pricing - {selectedCustomer?.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {selectedCustomer && (
                <PricingManager 
                  customerId={selectedCustomer.id} 
                  customerName={selectedCustomer.name} 
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ManageCustomers;
