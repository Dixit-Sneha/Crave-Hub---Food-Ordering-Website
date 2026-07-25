"use client";

import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
};

export default function MenuList({ items, restaurantId }: { items: MenuItem[], restaurantId: string }) {
  const { addItem } = useCart();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {items.map(item => (
        <div key={item.id} className="glass-card" style={{ display: 'flex', padding: '1rem', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <div style={{ 
                width: 12, height: 12, border: `1px solid ${item.isVeg ? 'green' : 'red'}`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.isVeg ? 'green' : 'red' }} />
              </div>
              <h4 style={{ fontSize: '1.125rem' }}>{item.name}</h4>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {item.description}
            </p>
            <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
              ${item.price.toFixed(2)}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '8px', backgroundImage: `url(${item.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <button 
              onClick={() => addItem({ ...item, quantity: 1 }, restaurantId)}
              className="btn" 
              style={{ padding: '0.25rem 1rem', background: '#fff', color: 'var(--color-primary)', border: '1px solid var(--color-primary)', marginTop: '-15px' }}
            >
              ADD <Plus size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
