'use client';
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Plus, Mail, Phone, UserCheck, UserX, Edit } from "lucide-react";

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    status: "active"
  });

  const staffMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "+1 234 567 8901",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-15 10:30 AM",
      ordersProcessed: 45
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      phone: "+1 234 567 8902",
      role: "staff",
      status: "active",
      lastLogin: "2024-01-14 2:15 PM",
      ordersProcessed: 32
    },
    {
      id: 3,
      name: "Lisa Chen",
      email: "lisa.chen@company.com",
      phone: "+1 234 567 8903",
      role: "staff",
      status: "inactive",
      lastLogin: "2024-01-10 9:45 AM",
      ordersProcessed: 78
    }
  ];

  const handleAddStaff = () => {
    console.log("Adding new staff member:", newStaff);
    setNewStaff({ name: "", email: "", phone: "", role: "staff", status: "active" });
    setIsDialogOpen(false);
    // Here you would typically make an API call to create the staff member
  };

  const handleEditStaff = (staff: any) => {
    setEditingStaff(staff);
    setNewStaff(staff);
    setIsDialogOpen(true);
  };

  const handleUpdateStaff = () => {
    console.log("Updating staff member:", newStaff);
    setEditingStaff(null);
    setNewStaff({ name: "", email: "", phone: "", role: "staff", status: "active" });
    setIsDialogOpen(false);
    // Here you would typically make an API call to update the staff member
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout userType="admin">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Manage Staff Members</h1>
          <p className="text-slate-600">Add, edit, and manage staff member accounts</p>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newStaff.role} onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newStaff.status} onValueChange={(value) => setNewStaff({ ...newStaff, status: value })}>
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
                  setEditingStaff(null);
                  setNewStaff({ name: "", email: "", phone: "", role: "staff", status: "active" });
                }}>
                  Cancel
                </Button>
                <Button onClick={editingStaff ? handleUpdateStaff : handleAddStaff}>
                  {editingStaff ? "Update" : "Add"} Staff Member
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Staff Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{staff.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{staff.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3" />
                          <span>{staff.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="h-3 w-3" />
                          <span>{staff.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-slate-500">Last login: {staff.lastLogin}</span>
                        <span className="text-xs text-slate-500">Orders processed: {staff.ordersProcessed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge variant={staff.role === "admin" ? "default" : "secondary"}>
                        {staff.role}
                      </Badge>
                    </div>
                    <Badge variant={staff.status === "active" ? "default" : "secondary"}>
                      {staff.status === "active" ? (
                        <UserCheck className="h-3 w-3 mr-1" />
                      ) : (
                        <UserX className="h-3 w-3 mr-1" />
                      )}
                      {staff.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditStaff(staff)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ManageStaff;
