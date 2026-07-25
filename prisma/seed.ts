const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning database...");
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding test user...");
  const hashedPassword = await bcrypt.hash("password123", 10);
  const testUser = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@cravebite.com",
      password: hashedPassword,
      phone: "1234567890",
      defaultAddress: "123 Foodie Lane, Flavor Town, CA 90210",
      role: "CUSTOMER",
    }
  });

  console.log("Seeding restaurants and menu items...");

  const restaurants = [
    {
      name: "Luigi's Pizza",
      slug: "luigis-pizza",
      address: "456 Little Italy St, NY 10012",
      rating: 4.8,
      cuisine: "Italian",
      coverImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 35,
      isPremium: true,
      menuItems: {
        create: [
          { name: "Margherita Pizza", description: "Classic tomato sauce, fresh mozzarella, basil", price: 14.99, category: "Mains", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Pepperoni Pizza", description: "Tomato sauce, mozzarella, double pepperoni", price: 16.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Garlic Bread", description: "Oven-baked bread with garlic butter and herbs", price: 5.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Tiramisu", description: "Coffee-flavored Italian dessert", price: 7.99, category: "Desserts", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Italian Soda", description: "Refreshing bubbly drink with fruit syrup", price: 3.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Spice Route Indian",
      slug: "spice-route-indian",
      address: "101 Curry Ave, SF 94103",
      rating: 4.7,
      cuisine: "Indian",
      coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 40,
      isPremium: true,
      menuItems: {
        create: [
          { name: "Chicken Tikka Masala", description: "Roasted chicken chunks in spicy sauce", price: 18.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Paneer Butter Masala", description: "Cottage cheese in rich tomato gravy", price: 16.99, category: "Mains", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Garlic Naan", description: "Indian flatbread topped with garlic and butter", price: 3.99, category: "Breads", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1605335198906-8d5ec423d201?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Samosa", description: "Crispy pastry filled with spiced potatoes", price: 5.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Mango Lassi", description: "Sweet yogurt-based mango drink", price: 4.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1550454370-366524944d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Dragon Wok",
      slug: "dragon-wok",
      address: "88 Chinatown Blvd, SF 94108",
      rating: 4.5,
      cuisine: "Chinese",
      coverImage: "https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 25,
      isPremium: false,
      menuItems: {
        create: [
          { name: "Kung Pao Chicken", description: "Spicy stir-fried chicken with peanuts", price: 15.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Veggie Spring Rolls", description: "Crispy rolls filled with vegetables (3 pieces)", price: 6.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1592314644026-66632c4e339a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Pork Dumplings", description: "Steamed or fried pork dumplings (6 pieces)", price: 8.99, category: "Starters", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Egg Fried Rice", description: "Classic fried rice with eggs and scallions", price: 10.99, category: "Mains", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Jasmine Tea", description: "Traditional hot jasmine tea", price: 2.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Burger Joint",
      slug: "burger-joint",
      address: "123 Main St, LA 90001",
      rating: 4.6,
      cuisine: "Fast Food",
      coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 20,
      isPremium: false,
      menuItems: {
        create: [
          { name: "Classic Cheeseburger", description: "Beef patty, cheddar cheese, lettuce, tomato, house sauce", price: 12.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Double Bacon Smash", description: "Two smashed beef patties, crispy bacon, american cheese", price: 16.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1594212691516-4357bc3bcf69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Beyond Burger", description: "Plant-based patty, vegan cheese, lettuce, tomato", price: 14.99, category: "Mains", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "French Fries", description: "Crispy golden shoestring fries", price: 4.99, category: "Sides", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Chocolate Shake", description: "Thick hand-spun chocolate milkshake", price: 6.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75bb87d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Green Bowl Healthy",
      slug: "green-bowl-healthy",
      address: "99 Wellness Way, Austin 78701",
      rating: 4.9,
      cuisine: "Healthy",
      coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 30,
      isPremium: true,
      menuItems: {
        create: [
          { name: "Quinoa Power Bowl", description: "Quinoa, roasted sweet potatoes, kale, avocado, tahini dressing", price: 15.99, category: "Mains", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Grilled Salmon Salad", description: "Wild-caught salmon, mixed greens, cherry tomatoes, citrus vinaigrette", price: 19.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Acai Bowl", description: "Acai blend topped with granola, banana, and berries", price: 11.99, category: "Desserts", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1590165482155-a5080b0805bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Avocado Toast", description: "Sourdough toast with smashed avocado and red pepper flakes", price: 9.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Green Detox Smoothie", description: "Spinach, kale, apple, lemon, ginger", price: 7.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587ce574?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Taco Fiesta",
      slug: "taco-fiesta",
      address: "202 Fiesta Dr, Miami 33101",
      rating: 4.4,
      cuisine: "Mexican",
      coverImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 25,
      isPremium: false,
      menuItems: {
        create: [
          { name: "Carne Asada Tacos", description: "Three soft corn tortillas with grilled steak, onions, cilantro", price: 11.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Chicken Quesadilla", description: "Flour tortilla with melted cheese and grilled chicken", price: 10.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1618040911157-00f8eb4a6828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Chips & Guacamole", description: "Freshly made guacamole with tortilla chips", price: 6.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1583091910609-b63de549bc53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Churros", description: "Fried dough pastries dusted with cinnamon sugar", price: 5.99, category: "Desserts", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1624371414361-e670edf48f8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Margarita (Non-Alcoholic)", description: "Lime juice, agave, sparkling water", price: 4.99, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1568227451633-91ec485dce9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "Sushi Master",
      slug: "sushi-master",
      address: "333 Sakura Ln, Seattle 98101",
      rating: 4.8,
      cuisine: "Japanese",
      coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 45,
      isPremium: true,
      menuItems: {
        create: [
          { name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, cucumber, sesame seeds", price: 14.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Dragon Roll", description: "Shrimp tempura, eel, avocado, eel sauce", price: 18.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1627914483756-12c8b0933eb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Miso Soup", description: "Traditional soybean paste soup with tofu and seaweed", price: 4.99, category: "Starters", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Mochi Ice Cream", description: "Two pieces of Japanese rice cake with ice cream filling", price: 6.99, category: "Desserts", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    },
    {
      name: "The Daily Grind",
      slug: "the-daily-grind",
      address: "444 Coffee Bean Way, Portland 97204",
      rating: 4.7,
      cuisine: "Cafe",
      coverImage: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      deliveryTime: 20,
      isPremium: false,
      menuItems: {
        create: [
          { name: "Avocado Chicken Wrap", description: "Grilled chicken, avocado, spinach, light mayo in a spinach wrap", price: 11.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1626804475297-41609ea005eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Croissant Breakfast Sandwich", description: "Flaky croissant with egg, cheddar cheese, and bacon", price: 8.99, category: "Mains", isVeg: false, imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Blueberry Muffin", description: "Freshly baked large muffin loaded with blueberries", price: 4.50, category: "Desserts", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Caramel Macchiato", description: "Espresso with vanilla syrup, steamed milk, and caramel drizzle", price: 5.50, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
          { name: "Iced Cold Brew", description: "Slow-steeped cold brew coffee over ice", price: 4.50, category: "Beverages", isVeg: true, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
        ]
      }
    }
  ];

  for (const r of restaurants) {
    await prisma.restaurant.create({ data: r });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
