import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

export const PLAN_PRICE_ID: Record<string, string> = {
  seeker_pro_monthly: "price_1TxOE46R1hFpm8b6yfAlxTJw", // $29/mo (SGD 38.92)
  seeker_pro_annual: "price_1TxOB96R1hFpm8b65GHDog2n",  // $24/mo
  seeker_Executive_monthly: "price_1TxOCP6R1hFpm8b66udkGVyP",
  seeker_Executive_annual: "price_1TxODe6R1hFpm8b63r6lfm0M",
};

