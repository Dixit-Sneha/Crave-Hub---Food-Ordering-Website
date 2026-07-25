import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CuisineCarousel } from "@/components/CuisineCarousel";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
  const popularRestaurants = await db.restaurant.findMany({
    take: 6,
    orderBy: { rating: 'desc' }
  });

  return (
    <main>
      <Navbar />
      <HeroSection />
      <CuisineCarousel />
      
      <section style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Popular Restaurants</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>Top-rated spots in your neighborhood</p>
            </div>
            <Link href="/restaurants" className="btn btn-secondary">
              View All
            </Link>
          </div>

          <div className="grid-responsive">
            {popularRestaurants.map((restaurant) => (
              <Link href={`/restaurants/${restaurant.slug}`} key={restaurant.id} className="glass-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}>
                <div style={{ height: '200px', backgroundImage: `url(${restaurant.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  {restaurant.isPremium && (
                    <span className="badge" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-primary)', color: 'white' }}>Premium</span>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{restaurant.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                      <Star size={16} fill="currentColor" /> {restaurant.rating.toFixed(1)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={16} /> {restaurant.deliveryTime} mins
                    </span>
                    <span>{restaurant.cuisine}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
