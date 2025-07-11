
export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  pricePerUnit: number;
}

export interface CustomerPricing {
  customerId: number;
  customerName: string;
  tiers: PricingTier[];
}

export const defaultPricingTiers: PricingTier[] = [
  { minQuantity: 0, maxQuantity: 99, pricePerUnit: 0.40 },
  { minQuantity: 100, maxQuantity: 299, pricePerUnit: 0.30 },
  { minQuantity: 300, pricePerUnit: 0.20 }
];
