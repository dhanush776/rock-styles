# ROCK STYLES — Fresh E-commerce Project

Next.js 15 + TypeScript + Firebase Firestore/Auth + Cloudinary unsigned image upload.

## 1. Firebase
Copy `.env.local.example` to `.env.local` and paste the SAME Firebase web-app values from the old Rock Styles project.

Required:
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- NEXT_PUBLIC_ADMIN_EMAILS

Cloudinary is already set to the existing public cloud/preset:
- cloud: lb4gt6av
- preset: rock_styles_products_unsigned

## 2. Install
```cmd
npm install
npm run dev
```

## 3. Build / deploy
```cmd
npm run build
npm start
```

## 4. Routes
Store: `/`
Shop: `/categories`
Product: `/product/[id]`
Cart: `/cart`
Checkout: `/checkout`
Orders: `/orders`
Wishlist: `/wishlist`
Account: `/account`
Contact: `/contact`
Admin login: `/admin/login`
Admin dashboard: `/admin/dashboard`

## 5. Firestore collections
Existing collection names are kept:
- `products`
- `orders`

Product documents support `name`, `price`, `image`, `images`, `category`, `stock`, `description`, `active`, `createdAt`, `updatedAt`.
