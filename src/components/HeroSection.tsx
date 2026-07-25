"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ 
      position: 'relative', 
      padding: '6rem 0', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.05) 0%, rgba(76, 175, 80, 0.05) 100%)'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
          fontWeight: 900, 
          marginBottom: '1rem',
          lineHeight: 1.1
        }}>
          Cravings Delivered <span style={{ color: 'var(--color-primary)' }}>Fast!</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: 'var(--color-text-muted)', 
          maxWidth: '600px', 
          margin: '0 auto 2.5rem auto' 
        }}>
          Experience premium dining from the comfort of your home. Order from top-rated restaurants near you.
        </p>
        
        <div style={{ 
          display: 'flex', 
          maxWidth: '500px', 
          margin: '0 auto',
          background: 'white',
          padding: '0.5rem',
          borderRadius: '999px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: '#888' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for restaurants or cuisines..." 
            style={{ 
              flex: 1, 
              border: 'none', 
              outline: 'none', 
              fontSize: '1rem',
              padding: '0.5rem 0',
              background: 'transparent'
            }}
          />
          <Link href="/restaurants" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
            Find Food
          </Link>
        </div>
      </div>

      {/* Decorative Particles (Client-side only) */}
      {mounted && (
        <>
          <div style={{ position: 'absolute', top: '15%', left: '10%', fontSize: '3rem', opacity: 0.2, transform: 'rotate(-15deg)' }}>🍕</div>
          <div style={{ position: 'absolute', top: '25%', right: '15%', fontSize: '3rem', opacity: 0.2, transform: 'rotate(15deg)' }}>🍣</div>
          <div style={{ position: 'absolute', bottom: '20%', left: '20%', fontSize: '3rem', opacity: 0.2, transform: 'rotate(25deg)' }}>🍔</div>
          <div style={{ position: 'absolute', bottom: '30%', right: '10%', fontSize: '3rem', opacity: 0.2, transform: 'rotate(-10deg)' }}>🥗</div>
        </>
      )}
    </div>
  );
}
