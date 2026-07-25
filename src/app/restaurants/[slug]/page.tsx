import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Clock, MapPin } from "lucide-react";
import MenuList from "./MenuList";

export default async function RestaurantDetail({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuItems: true }
  });

  if (!restaurant) return notFound();

  // Group menu items
  const groupedMenu = restaurant.menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof restaurant.menuItems>);

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <div style={{ 
        height: '400px', 
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${restaurant.coverImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        color: 'white',
        paddingBottom: '3rem'
      }}>
        <div className="container">
          <div style={{ display: 'inline-block', background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
            {restaurant.cuisine}
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{restaurant.name}</h1>
          
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
              <Star fill="var(--color-accent)" color="var(--color-accent)" /> 
              <span style={{ fontWeight: 600 }}>{restaurant.rating.toFixed(1)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
              <Clock /> {restaurant.deliveryTime} mins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.125rem' }}>
              <MapPin /> {restaurant.address}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
          {Object.keys(groupedMenu).map(category => (
            <div key={category} style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-border)' }}>
                {category}
              </h3>
              <MenuList items={groupedMenu[category]} restaurantId={restaurant.id} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
