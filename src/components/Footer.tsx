"use client";

import Link from "next/link";
import { Utensils, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ background: '#111', color: '#fff', padding: '4rem 0 2rem 0', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Utensils size={28} color="var(--color-primary)" />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>CraveBite</span>
          </div>
          <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
            Premium food delivery connecting you with the best restaurants in your neighborhood.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: '#fff' }}><Twitter size={20} /></a>
            <a href="#" style={{ color: '#fff' }}><Instagram size={20} /></a>
            <a href="#" style={{ color: '#fff' }}><Facebook size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link href="#" style={{ color: '#aaa' }}>About Us</Link></li>
            <li><Link href="#" style={{ color: '#aaa' }}>Careers</Link></li>
            <li><Link href="#" style={{ color: '#aaa' }}>Blog</Link></li>
            <li><Link href="#" style={{ color: '#aaa' }}>Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link href="#" style={{ color: '#aaa' }}>Terms of Service</Link></li>
            <li><Link href="#" style={{ color: '#aaa' }}>Privacy Policy</Link></li>
            <li><Link href="#" style={{ color: '#aaa' }}>Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container" style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', color: '#aaa', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} CraveBite. All rights reserved.
      </div>
    </footer>
  );
}
