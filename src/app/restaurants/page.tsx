import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

export default async function RestaurantsPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const cuisine = typeof params.cuisine === 'string' ? params.cuisine : undefined;

  const where = cuisine ? { cuisine } : {};
  
  const restaurants = await db.restaurant.findMany({
    where,
    orderBy: { rating: 'desc' }
  });

  const cuisines = await db.restaurant.findMany({
    select: { cuisine: true },
    distinct: ['cuisine']
  });

  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem' }}>{cuisine ? `${cuisine} Restaurants` : "All Restaurants"}</h1>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <Link 
            href="/restaurants" 
            className={`badge ${!cuisine ? 'badge-success' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            All
          </Link>
          {cuisines.map((c) => (
            <Link 
              key={c.cuisine}
              href={`/restaurants?cuisine=${c.cuisine}`} 
              className={`badge ${cuisine === c.cuisine ? 'badge-success' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', textDecoration: 'none' }}
            >
              {c.cuisine}
            </Link>
          ))}
        </div>

        {restaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem' }}>No restaurants found for this cuisine.</p>
          </div>
        ) : (
          <div className="grid-responsive">
            {restaurants.map((restaurant) => (
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
        )}
      </div>
      <Footer />
    </main>
  );
}
