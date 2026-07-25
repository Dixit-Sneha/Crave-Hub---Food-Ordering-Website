export const createRazorpayOrder = async (amount: number, currency: string = "INR") => {
  // Mock Razorpay Order for Sandbox
  return {
    id: `order_mock_${Date.now()}`,
    amount,
    currency,
    status: 'created'
  };
};
