"use client";

import Link from "next/link";
import { Pizza, Fish, Beef, Leaf, Coffee, Soup } from "lucide-react";

export function CuisineCarousel() {
  const cuisines = [
    { name: "Pizza", icon: Pizza, color: "#ff5722" },
    { name: "Sushi", icon: Fish, color: "#2196f3" },
    { name: "Burgers", icon: Beef, color: "#795548" },
    { name: "Healthy", icon: Leaf, color: "#4caf50" },
    { name: "Cafe", icon: Coffee, color: "#9c27b0" },
    { name: "Asian", icon: Soup, color: "#e91e63" },
  ];

  return (
    <div style={{ padding: '4rem 0' }}>
      <div className="container">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>Explore by Cuisine</h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1.5rem', 
          flexWrap: 'wrap'
        }}>
          {cuisines.map((c) => (
            <Link 
              href={`/restaurants?cuisine=${c.name}`} 
              key={c.name}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '140px',
                height: '140px',
                gap: '1rem',
                textDecoration: 'none',
                color: 'var(--color-text)'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: `${c.color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: c.color
              }}>
                <c.icon size={32} />
              </div>
              <span style={{ fontWeight: 600 }}>{c.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
