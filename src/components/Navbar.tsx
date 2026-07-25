"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { Utensils, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Utensils size={28} color="var(--color-primary)" />
          <span style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CraveBite</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.5rem' }} className="md-flex">
          <Link href="/restaurants" style={{ fontWeight: 600 }}>Restaurants</Link>
          
          <Link href="/checkout" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <ShoppingCart size={24} />
            {mounted && totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: 'var(--color-primary)', color: 'white',
                fontSize: '0.7rem', fontWeight: 'bold',
                width: 18, height: 18, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </Link>

          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '0.4rem 1rem' }}>
                <User size={18} /> Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="btn" style={{ padding: '0.4rem 1rem', background: 'transparent', border: '1px solid var(--color-border)' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-primary">Login</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md-hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: 'var(--shadow-md)' }} className="md-hidden">
          <Link href="/restaurants" onClick={() => setMobileMenuOpen(false)}>Restaurants</Link>
          <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Cart ({mounted ? totalItems : 0})
          </Link>
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)' }} />
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--color-error)', fontWeight: 600, fontSize: '1rem' }}>Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>Login</Link>
          )}
        </div>
      )}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
