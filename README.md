# Crave Hub

A modern full-stack food ordering web application built with **Next.js, React, Prisma, and Razorpay**. Crave Hub provides a complete online food ordering experience with user authentication, restaurant/menu browsing, cart management, order processing, and secure online payments.

## Project Overview

Crave Hub is designed as a complete food delivery platform that connects the customer-facing ordering experience with a backend database and payment workflow.

The application focuses on building a realistic full-stack e-commerce workflow — from user authentication and browsing food items to managing a cart, placing orders, and processing payments.

## Key Features

### 👤 User Authentication

* User registration and login.
* Secure password handling using `bcryptjs`.
* Authentication and session management using **NextAuth.js**.
* Protected user-specific functionality.

### 🍔 Food Ordering

* Browse available food items.
* View food details and pricing.
* Add items to the shopping cart.
* Update item quantities and remove items.
* Calculate order totals dynamically.

### 🛒 Cart & Checkout

* Persistent cart workflow.
* Order summary before checkout.
* Customer and order information management.
* Streamlined checkout experience.

### 💳 Online Payments

* Integrated **Razorpay** payment gateway.
* Payment processing as part of the checkout workflow.
* Order creation and payment flow integrated with the backend.

### 🗄️ Database Management

* **Prisma ORM** for database interaction.
* Structured relational data management.
* Prisma seed script for initializing application data.

### ✅ Data Validation

* **Zod** for schema-based validation.
* Type-safe development using **TypeScript**.

### 🎨 Modern UI

* Responsive food-ordering interface.
* Reusable React components.
* Lucide icons for interface elements.
* Designed for a smooth and intuitive ordering experience.

## Technology Stack

| Category          | Technology       |
| ----------------- | ---------------- |
| Frontend          | React            |
| Framework         | Next.js          |
| Language          | TypeScript       |
| Authentication    | NextAuth.js      |
| Database ORM      | Prisma           |
| Database          | SQLite           |
| Payments          | Razorpay         |
| Validation        | Zod              |
| Password Security | bcryptjs         |
| Icons             | Lucide React     |
| Styling           | CSS / Next.js UI |

The project's dependency configuration confirms the use of Next.js 16, React 19, Prisma 6, NextAuth, Razorpay, Zod, bcryptjs, and TypeScript.

## Application Workflow

```text
                ┌───────────────┐
                │    Customer   │
                └───────┬───────┘
                        ↓
              Browse Food Items
                        ↓
                  View Menu
                        ↓
                  Add to Cart
                        ↓
                 Review Order
                        ↓
                    Checkout
                        ↓
              Razorpay Payment
                        ↓
                 Order Created
                        ↓
               Order Confirmation
```

## Project Architecture

```text
Crave Hub
│
├── Frontend
│   ├── Next.js
│   ├── React Components
│   └── Responsive UI
│
├── Authentication
│   ├── NextAuth.js
│   └── bcryptjs
│
├── Backend
│   ├── Next.js Server Logic
│   ├── Prisma ORM
│   └── API / Server Operations
│
├── Database
│   └── SQLite
│
├── Payments
│   └── Razorpay
│
└── Validation
    └── Zod
```

## Security & Configuration

Environment variables are used for database configuration and authentication settings, while `.env` files are excluded through `.gitignore`.
**Important:** Never commit your `.env` file or real API/payment credentials to GitHub.

Create a local `.env` file with the required configuration before running the project.

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Crave-Hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add the required database, authentication, and Razorpay configuration.

### 4. Initialize the Database

Run the appropriate Prisma commands for your local database setup and seed the initial data.

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

These scripts are defined in the project's package configuration.

## Project Structure

```text
Crave-Hub/
│
├── src/
│   ├── app/
│   ├── components/
│   └── ...
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│
├── package.json
├── package-lock.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── .gitignore
└── README.md
```

## Learning Outcomes

This project demonstrates practical experience with:

* Full-stack web application development
* Next.js and React
* TypeScript
* Authentication and authorization
* Database design and ORM usage
* REST/API-based application workflows
* Payment gateway integration
* Form and data validation
* Secure credential handling
* Git and GitHub project management
* Building an end-to-end e-commerce workflow

## Future Improvements

* Real-time order tracking
* Restaurant/vendor dashboard
* Advanced search and filtering
* Food ratings and reviews
* Order history and reorder functionality
* Delivery partner integration
* Location-based restaurant discovery
* Improved payment and order-status handling
* Deployment with a production database

## License

This project was developed as a personal/academic web development project.

