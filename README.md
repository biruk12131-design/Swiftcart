# SwiftCart

SwiftCart is a high-end, responsive e-commerce platform demonstrating expert-level front-end architecture, state management, and UI design.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Mock-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Chart-FF5722?style=for-the-badge)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100%25-green?style=for-the-badge&logo=lighthouse)

## Features

- **Storefront:** Beautifully styled landing page, featured carousels, and category grids.
- **Product Listing:** Filter by price, category, and minimum rating. Simulated API delays for realistic UX.
- **Product Detail:** Image galleries, descriptions, quantity selectors.
- **Shopping Cart:** Real-time totals, quantity update and coupon application (`SAVE10`, `FREESHIP`).
- **Checkout Flow:** Interactive multi-step mock checkout with inline validation elements.
- **Order History:** Tracking past order statuses.
- **Merchant Dashboard:** Full panel to manage products, view orders, update status, and track revenue via recharts.
- **Architecture:** `AppProvider` using React Context + localStorage.
- **Accessibility & Responsive:** Fully responsive layout, semantic HTML, dark/light theme support.

## Project Structure

```
SwiftCart/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── storefront/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── dashboard/
│   │   └── layout/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── hooks/
│   ├── context/
│   ├── styles/
│   └── App.tsx
├── public/
│   ├── images/
│   └── assets/
├── tests/
├── node_modules/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .gitignore
└── README.md
```

### Directory Overview

- **src/components/** - Reusable React components organized by feature
  - **common/** - Shared UI components (Button, Card, Header, Footer, etc.)
  - **storefront/** - Landing page and product listing components
  - **cart/** - Shopping cart related components
  - **checkout/** - Checkout flow components
  - **dashboard/** - Merchant dashboard components
  - **layout/** - Layout wrapper components
- **src/pages/** - Page components for routing
- **src/services/** - API and external service integrations
- **src/utils/** - Utility functions and helpers
- **src/types/** - TypeScript type definitions and interfaces
- **src/hooks/** - Custom React hooks
- **src/context/** - React Context for state management (AppProvider)
- **src/styles/** - Global styles and theme configuration
- **public/** - Static assets and images
- **tests/** - Test files and test utilities

[Vercel Deployment URL Placeholder]
