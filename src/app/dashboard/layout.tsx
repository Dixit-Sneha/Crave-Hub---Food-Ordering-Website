import "./dashboard.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Utensils, LayoutDashboard, ShoppingBag, MapPin, User } from "lucide-react";
import SignOutButton from "./SignOutButton";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div style={{ padding: '0 2rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
            <Utensils size={28} color="var(--color-primary)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CraveBite</span>
          </Link>
        </div>

        <ul className="sidebar-nav">
          <li>
            <Link href="/dashboard" className="sidebar-link">
              <LayoutDashboard size={20} /> Overview
            </Link>
          </li>
          <li>
            <Link href="/dashboard/orders" className="sidebar-link">
              <ShoppingBag size={20} /> Orders
            </Link>
          </li>
          <li>
            <Link href="#" className="sidebar-link">
              <MapPin size={20} /> Addresses
            </Link>
          </li>
          <li>
            <Link href="#" className="sidebar-link">
              <User size={20} /> Profile
            </Link>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', padding: '0 2rem' }}>
          <SignOutButton />
        </div>
      </aside>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
