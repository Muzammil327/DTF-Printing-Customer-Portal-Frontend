
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { PricingTier } from "@/types/pricing";
import { customerPricingData } from "@/utils/pricing";

interface PricingManagerProps {
  customerId?: number;
  customerName?: string;
}

export const PricingManager = ({ customerId, customerName }: PricingManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [newTier, setNewTier] = useState<PricingTier>({
    minQuantity: 0,
    pricePerUnit: 0
  });

  const customerPricing = customerPricingData.find(cp => cp.customerId === customerId);
  const tiers = customerPricing?.tiers || [];

  const handleAddTier = () => {
    console.log("Adding new pricing tier:", newTier);
    setNewTier({ minQuantity: 0, pricePerUnit: 0 });
    setIsDialogOpen(false);
  };

  const handleEditTier = (tier: PricingTier) => {
    setEditingTier(tier);
    setNewTier(tier);
    setIsDialogOpen(true);
  };

  const handleUpdateTier = () => {
    console.log("Updating pricing tier:", newTier);
    setEditingTier(null);
    setNewTier({ minQuantity: 0, pricePerUnit: 0 });
    setIsDialogOpen(false);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Pricing Tiers {customerName && `- ${customerName}`}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTier ? "Edit Pricing Tier" : "Add New Pricing Tier"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="minQuantity">Minimum Quantity</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={newTier.minQuantity}
                    onChange={(e) => setNewTier({ ...newTier, minQuantity: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxQuantity">Maximum Quantity (optional)</Label>
                  <Input
                    id="maxQuantity"
                    type="number"
                    value={newTier.maxQuantity || ""}
                    onChange={(e) => setNewTier({ ...newTier, maxQuantity: e.target.value ? parseInt(e.target.value) : undefined })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pricePerUnit">Price Per Unit ($)</Label>
                  <Input
                    id="pricePerUnit"
                    type="number"
                    step="0.01"
                    value={newTier.pricePerUnit}
                    onChange={(e) => setNewTier({ ...newTier, pricePerUnit: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setIsDialogOpen(false);
                  setEditingTier(null);
                  setNewTier({ minQuantity: 0, pricePerUnit: 0 });
                }}>
                  Cancel
                </Button>
                <Button onClick={editingTier ? handleUpdateTier : handleAddTier}>
                  {editingTier ? "Update" : "Add"} Tier
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tiers.map((tier, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  {tier.minQuantity}
                  {tier.maxQuantity ? `-${tier.maxQuantity}` : '+'}
                </Badge>
                <span className="font-medium">${tier.pricePerUnit.toFixed(2)} per unit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditTier(tier)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {tiers.length === 0 && (
            <p className="text-slate-500 text-center py-8">
              No pricing tiers configured. Add a tier to get started.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
