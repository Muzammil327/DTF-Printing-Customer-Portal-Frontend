
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CreditCard, 
  DollarSign, 
  Download, 
  Plus,
  History,
  Wallet
} from "lucide-react";

const PaymentPage = () => {
  const [addAmount, setAddAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);

  const currentBalance = 125.50;
  
  const paymentHistory = [
    { id: 1, date: "2024-01-15", amount: 89.97, method: "Credit Card", type: "charge", description: "Order ORD-001" },
    { id: 2, date: "2024-01-14", amount: 100.00, method: "Credit Card", type: "credit", description: "Account top-up" },
    { id: 3, date: "2024-01-12", amount: 29.99, method: "Account Balance", type: "charge", description: "Order ORD-002" },
    { id: 4, date: "2024-01-10", amount: 149.95, method: "PayPal", type: "charge", description: "Order ORD-003" },
    { id: 5, date: "2024-01-08", amount: 75.00, method: "Bank Transfer", type: "credit", description: "Account top-up" },
  ];

  const handleAddBalance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setAddAmount("");
      alert(`Successfully added $${addAmount} to your account!`);
    }, 2000);
  };

  return (
    <Layout userType="customer">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payments & Balance</h1>
          <p className="text-slate-600">Manage your account balance and view payment history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Balance */}
          <Card className="border-0 shadow-lg lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-green-600" />
                <span>Current Balance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-2">
                  ${currentBalance.toFixed(2)}
                </p>
                <p className="text-slate-600">Available for orders</p>
              </div>
            </CardContent>
          </Card>

          {/* Add Balance */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-blue-600" />
                <span>Add Balance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBalance} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Add</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        required
                        min="10"
                        step="0.01"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-2">
                  <Label>Quick amounts</Label>
                  <div className="flex flex-wrap gap-2">
                    {[25, 50, 100, 200].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setAddAmount(amount.toString())}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading || !addAmount}
                >
                  {isLoading ? "Processing..." : `Add $${addAmount || "0.00"} to Balance`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <History className="h-5 w-5" />
              <span>Payment History</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      payment.type === "credit" 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    }`}>
                      {payment.type === "credit" ? (
                        <Plus className={`h-5 w-5 text-green-600`} />
                      ) : (
                        <CreditCard className={`h-5 w-5 text-red-600`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{payment.description}</p>
                      <p className="text-sm text-slate-500">
                        {payment.date} • {payment.method}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      payment.type === "credit" 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {payment.type === "credit" ? "+" : "-"}${payment.amount.toFixed(2)}
                    </p>
                    <Badge 
                      variant="outline" 
                      className={payment.type === "credit" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {payment.type === "credit" ? "Credit" : "Charge"}
                    </Badge>
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

export default PaymentPage;
