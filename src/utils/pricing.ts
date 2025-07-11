
import { PricingTier, CustomerPricing, defaultPricingTiers } from "@/types/pricing";

// Mock customer pricing data - in a real app, this would come from your database
export const customerPricingData: CustomerPricing[] = [
  {
    customerId: 1,
    customerName: "John Doe",
    tiers: [
      { minQuantity: 0, maxQuantity: 99, pricePerUnit: 0.45 },
      { minQuantity: 100, maxQuantity: 299, pricePerUnit: 0.35 },
      { minQuantity: 300, pricePerUnit: 0.25 }
    ]
  },
  {
    customerId: 2,
    customerName: "Jane Smith",
    tiers: [
      { minQuantity: 0, maxQuantity: 149, pricePerUnit: 0.40 },
      { minQuantity: 150, maxQuantity: 399, pricePerUnit: 0.30 },
      { minQuantity: 400, pricePerUnit: 0.18 }
    ]
  }
];

export const calculatePriceForCustomer = (customerId: number, quantity: number): number => {
  const customerPricing = customerPricingData.find(cp => cp.customerId === customerId);
  const tiers = customerPricing?.tiers || defaultPricingTiers;
  
  const applicableTier = tiers.find(tier => {
    return quantity >= tier.minQuantity && 
           (tier.maxQuantity === undefined || quantity <= tier.maxQuantity);
  });
  
  return applicableTier ? applicableTier.pricePerUnit * quantity : 0;
};

export const getPricingTiersForCustomer = (customerId: number): PricingTier[] => {
  const customerPricing = customerPricingData.find(cp => cp.customerId === customerId);
  return customerPricing?.tiers || defaultPricingTiers;
};
