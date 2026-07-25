import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Package } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) return null;

  const orders = await db.order.findMany({
    where: { userId: (session.user as any).id },
    include: { restaurant: true },
    orderBy: { createdAt: 'desc' }
  });

  const getProgress = (status: string) => {
    switch (status) {
      case 'PENDING': return 25;
      case 'PREPARING': return 50;
      case 'OUT_FOR_DELIVERY': return 75;
      case 'DELIVERED': return 100;
      default: return 0;
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Order History</h1>

      {orders.length === 0 ? (
        <div className="glass-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Package size={48} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No orders yet</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Looks like you haven't placed any orders.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map(order => (
            <div key={order.id} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{order.restaurant.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Order #{order.id.slice(-8)} • {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>${order.totalAmount.toFixed(2)}</div>
                  <span className={`badge ${order.status === 'DELIVERED' ? 'badge-success' : 'badge-warning'}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Live Tracking Visualization */}
              <div className="tracking-container">
                <div className="tracking-line" />
                <div className="tracking-progress" style={{ width: `${getProgress(order.status)}%` }} />
                
                <div className="tracking-step">
                  <div className={`tracking-dot ${getProgress(order.status) >= 25 ? 'completed' : (getProgress(order.status) === 0 ? '' : 'active')}`} />
                  <span className="tracking-label">Placed</span>
                </div>
                <div className="tracking-step">
                  <div className={`tracking-dot ${getProgress(order.status) >= 50 ? 'completed' : (getProgress(order.status) === 25 ? 'active' : '')}`} />
                  <span className="tracking-label">Preparing</span>
                </div>
                <div className="tracking-step">
                  <div className={`tracking-dot ${getProgress(order.status) >= 75 ? 'completed' : (getProgress(order.status) === 50 ? 'active' : '')}`} />
                  <span className="tracking-label">On the Way</span>
                </div>
                <div className="tracking-step">
                  <div className={`tracking-dot ${getProgress(order.status) >= 100 ? 'completed' : ''}`} />
                  <span className="tracking-label">Delivered</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
