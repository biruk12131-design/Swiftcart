
# SwiftCart

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-mock-635BFF?logo=stripe)
![Chart.js](https://img.shields.io/badge/Chart.js-4-FF6384?logo=chart.js)
![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)

A full‑featured online store with product browsing, cart, checkout, order history, and a merchant dashboard. 

🚀 Live Demo

https://swiftcart-lime.vercel.app/products

✨ Features

· Product Listing – 30 products, search, filter by category/price/rating.
· Shopping Cart – Add, remove, quantity, coupon codes.
· Checkout – Multi‑step form with mock payment.
· Order History – Past orders with status tracking.
· Merchant Dashboard – Product & order management, sales chart.
· Dark/Light Mode – Persisted.
· Fully Responsive – Mobile, tablet, desktop.
· Accessible – Semantic HTML, ARIA labels, skip to content.

🛠 Tech Stack

· Framework: Next.js 14 (App Router)
· Language: TypeScript
· Styling: Tailwind CSS
· Charts: react-chartjs-2, Chart.js (merchant dashboard)
· Icons: lucide-react
· Deployment: Vercel

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




📸 Screenshot

https://placehold.co/800x500?text=SwiftCart

🚦 Getting Started

```bash
git clone https://github.com/birukdev12-senior/swiftcart.git
cd swiftcart
npm install
npm run dev

