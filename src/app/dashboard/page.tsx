import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome back, {session?.user?.name || "User"}!</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Here's what's happening with your account.</p>
        </div>
      </div>

      <div className="grid-responsive" style={{ marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', lineHeight: 1 }}>1</h3>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Active Orders</p>
        </div>
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', lineHeight: 1 }}>12</h3>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Orders</p>
        </div>
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', lineHeight: 1 }}>3</h3>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Saved Addresses</p>
        </div>
      </div>
    </div>
  );
}
