
---

# Stellar Wear - Full-Stack E-Commerce Project

This is a complete full-stack e-commerce application for **Stellar Wear** built using React.js for the frontend and ASP.NET Core (.NET 7) for the backend. The project includes features like product listing, cart functionality, user authentication, checkout integration with Stripe, and email notifications. It also incorporates MySQL for data persistence and uses Railway for deployment.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
4. [Environment Variables](#environment-variables)
5. [Deployment](#deployment)
   - [Backend Deployment](#backend-deployment)
   - [Frontend Deployment](#frontend-deployment)
6. [Database Setup](#database-setup)

---

## Technologies Used

### Backend
- **ASP.NET Core 7.0**
- **MySQL** for database
- **Entity Framework Core** as ORM
- **Stripe API** for payments
- **JWT Authentication** for user authentication
- **MailKit** for sending emails
- **Railway** for deployment

### Frontend
- **React.js (Vite)**
- **TailwindCSS** for UI styling
- **Radix UI** for interactive components
- **Axios** for making HTTP requests
- **Stripe** for payments
- **React Google Places Autocomplete** for address input
- **Railway** for deployment

---

## Features

### Backend Features
- **User Authentication** with JWT (Login/Register).
- **Role-Based Access Control** for Admin and Users.
- **Product Management** for adding/editing/deleting products (Admin feature).
- **Category Management** for product categorization.
- **Cart Management** to add, remove, and update items.
- **Checkout Process** using Stripe API for secure payments.
- **Order Management** for tracking user orders.
- **Email Notifications** using MailKit for order confirmation and user registration.

### Frontend Features
- **Homepage** with product listings.
- **Product Filter** by categories.
- **User Authentication** (Login/Register).
- **Cart** with add/remove/update item functionalities.
- **Checkout Process** integrated with Stripe.
- **Google Places Autocomplete** for address input during checkout.
- **Order Confirmation Page** post-purchase.

---

## Setup Instructions

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MRehmanZ/stellar-wear-backend.git
   cd stellar-wear-backend
   ```

2. **Install Dependencies:**
   Ensure you have .NET 7 SDK installed. Install the dependencies using:
   ```bash
   dotnet restore
   ```

3. **Update `appsettings.json`:**
   Make sure you set up the required environment variables (see [Environment Variables](#environment-variables)).

4. **Run Migrations and Seed Data:**
   Run migrations to create the database schema and seed initial data.
   ```bash
   dotnet ef database update
   ```

5. **Run the Backend:**
   ```bash
   dotnet run
   ```

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MRehmanZ/stellar-wear-frontend.git
   cd stellar-wear-frontend
   ```

2. **Install Dependencies:**
   Ensure you have Node.js installed. Install the dependencies using:
   ```bash
   npm install
   ```

3. **Update `.env` file:**
   Set up the required environment variables (see [Environment Variables](#environment-variables)).

4. **Run the Frontend:**
   ```bash
   npm run dev
   ```

---

## Environment Variables

### Backend (Railway)

You need to set the following environment variables on your backend deployment platform (e.g., Railway):

```bash
# JWT Configuration
JWT__Key=YourSecretKey
JWT__Issuer=https://your-domain.com

# MySQL Configuration
MYSQL_URL=your-mysql-url
MYSQL_HOST=your-mysql-host
MYSQL_PORT=3306
MYSQL_DB=your-database-name
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password

# Stripe Configuration
Stripe__SecretKey=sk_test_YourSecretKey
Stripe__PublishableKey=pk_test_YourPublishableKey

# Email Configuration
EmailSettings__SmtpServer=smtp.gmail.com
EmailSettings__SmtpPort=587
EmailSettings__SmtpUsername=your-email@gmail.com
EmailSettings__SmtpPassword=your-email-password
```

### Frontend (Railway)

Create a `.env` file in the root of the project with the following:

```bash
VITE_API_BASE_URL=https://your-backend-api-url
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YourPublishableKey
VITE_GOOGLE_PLACES_API_KEY=AIzaSyD9S-YourGoogleAPIKey
```

---

## Deployment

### Backend Deployment

You can deploy your backend to **Railway** using Docker or a similar platform.

1. **Install Railway CLI:**
   ```bash
   npm install -g railway
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Initialize Project:**
   ```bash
   railway init
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

Make sure you set all the environment variables under your Railway project settings.

### Frontend Deployment

1. **Build the Frontend:**
   ```bash
   npm run build
   ```

2. **Deploy to Railway:**
   Follow similar steps as backend deployment or use Vercel/Netlify for easier static deployments.

---

## Database Setup

### MySQL Database (Railway)

To set up the database, you can use **Railway** as a MySQL provider.

1. Go to your Railway dashboard and create a **MySQL** service.
2. Set up environment variables for the backend to connect to this service.

Example:

```bash
MYSQL_URL=mysql://user:password@mysql-host:3306/database
```

---

## Conclusion

This project implements a complete full-stack e-commerce solution with user authentication, payment processing, and cart functionalities. It integrates modern technologies such as React, ASP.NET Core, MySQL, and Stripe to provide a scalable and performant web application.