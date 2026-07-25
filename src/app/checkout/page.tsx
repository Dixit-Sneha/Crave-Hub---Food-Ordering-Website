"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  const { items, totalAmount, clearCart, restaurantId } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="container" style={{ padding: '6rem 0', textAlign: 'center', minHeight: '60vh' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Cart is Empty</h1>
          <button onClick={() => router.push("/restaurants")} className="btn btn-primary">Browse Restaurants</button>
        </div>
        <Footer />
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!address) {
      alert("Please enter a delivery address");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          restaurantId,
          deliveryAddress: address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrderDetails(data);
        setShowSimulator(true);
      } else {
        alert(data.error || "Failed to create order");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  const simulatePaymentSuccess = async () => {
    try {
      await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderDetails.razorpayOrderId,
          razorpay_payment_id: "pay_mock_123456",
          razorpay_signature: "mock_sig",
          order_id: orderDetails.orderId,
        })
      });
      clearCart();
      router.push("/dashboard/orders");
    } catch (e) {
      alert("Failed to verify payment");
    }
  };

  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Order Summary */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '50px', height: '50px', backgroundImage: `url(${item.imageUrl || ''})`, backgroundSize: 'cover', borderRadius: '4px', backgroundPosition: 'center' }} />
                    <div>
                      <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <span>Total Amount</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="glass-card" style={{ padding: '2rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Delivery Details</h3>
            
            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea 
                className="input-glass" 
                rows={3} 
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button 
              onClick={handleCheckout} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1rem' }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      {showSimulator && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-card" style={{ background: 'white', padding: '2rem', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Sandbox Checkout</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>This is a simulated Razorpay checkout window for local development.</p>
            
            <button onClick={simulatePaymentSuccess} className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
              Simulate Success
            </button>
            <button onClick={() => setShowSimulator(false)} className="btn btn-secondary" style={{ width: '100%' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
