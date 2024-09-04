This guide will help you set up the project locally, including environment variables and dependencies.

# Prerequisite

Before you begin, ensure you have the following software installed on your machine:

- Node.js (version 14.x or higher)
- npm or yarn
- Git (for version control)

Getting Started

1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/MRehmanZ/stellar-wear.git
cd stellar-wear
```

2. Install Dependencies

Next, install the required dependencies using npm or yarn:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

3. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables. These are mandatory for Stripe integration, API calls, and Google Places API functionality:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_STRIPE_SECRET_KEY=
VITE_API_BASE_URL=

VITE_GOOGLE_PLACES_API_KEY=
```

- VITE_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key, used for client-side Stripe API calls.
- VITE_STRIPE_SECRET_KEY: Your Stripe secret key, used for server-side Stripe API calls.
- VITE_API_BASE_URL: The base URL for your backend API. Make sure your backend server is running on this URL.
- VITE_GOOGLE_PLACES_API_KEY: Your Google Places API key, used for the autocomplete feature during address input.

4. Running the Development Server

Once everything is set up, you can start the development server:

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

This will start the Vite development server. You can view your project in the browser by navigating to `http://localhost:5173`.

5. Build for Production

To build the project for production, use the following command:

```bash
# Using npm
npm run build

# Or using yarn
yarn build
```

This will create an optimised build of the project in the `dist` directory.

6. Running the Production Build

You can preview the production build locally with:

```bash
# Using npm
npm run preview

# Or using yarn
yarn preview
```

This will start a local server to preview the production build.

Additional Notes

•	Backend Setup: Ensure your backend is set up and running correctly on the URL specified in `VITE_API_BASE_URL`. This project assumes that you have a backend API that handles orders, payments, and other data-related operations.

•	Stripe and Google Places Integration: Ensure that you have active accounts with Stripe and Google Cloud to use the Stripe and Google Places APIs. Replace the provided keys with your own if needed.


# Features to implement (may add more in the future):

- [x] Create a basic Navbar
- [x] Setup tailwind CSS for styling
- [x] Setup shadcn/ui to create styling components 
- [x] Implemnt a Navbar which includes navigation tabs, search, cart, auth buttons
- [x] Create a banner/hero section 
- [x] Display featured products 
- [x] Free shipping and newsletter sign up section
- [x] Products list page
- [x] Filter options and view change for product lists
- [x] Product page
- [x] Checkout page
- [x] Payment integration
- [x] Email for verification and order confirmation  
- [x] Create login, logout, and register (storing token in localstorage)
- [x] Error handling for authentication and other controllers (toast)
- [x] Compatible with Mobile and Tablet
- [x] Make use of 'alt=' to improve accessibility
- [x] Add pagination
- [x] Use of react widgets and tabs
- [x] Integration of a Maps API - store locator