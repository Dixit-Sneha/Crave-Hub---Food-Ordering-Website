"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })} 
      className="btn" 
      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#fce4e4', color: 'var(--color-error)' }}
    >
      <LogOut size={18} /> Logout
    </button>
  );
}
