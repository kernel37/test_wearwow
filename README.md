# WearWow - Mobile E-Commerce Application

A modern, responsive mobile e-commerce application built with React, TypeScript, and Tailwind CSS. WearWow offers a seamless shopping experience with features like product browsing, wishlist management, cart operations, and order tracking.

## 🌐 Live Preview

[View Live Demo](https://kernel37.github.io/test_wearwow)

![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://kernel37.github.io/test_wearwow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Architecture](#architecture)

## ✨ Features

- **Authentication**: Login, OTP verification, password reset
- **Product Discovery**: Browse products by category with filtering and sorting
- **Cart Management**: Add/remove items, adjust quantities, real-time total calculation
- **Wishlist**: Save favorite items for later
- **Order Management**: Track orders and view order details
- **Profile**: User information and settings
- **Notifications**: In-app notifications and alerts
- **Responsive UI**: Mobile-first design with smooth animations
- **Dark Mode Support**: Theme switching capability

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript 5.8
- **Build Tool**: Vite 5.4
- **Routing**: React Router DOM 6.30
- **Styling**: Tailwind CSS 3.4 + PostCSS
- **Component Library**: shadcn/ui (Radix UI primitives)
- **State Management**: React Context API + React Query 5.83
- **Form Management**: React Hook Form 7.61 + Zod validation
- **Animations**: Framer Motion 12.23
- **Icons**: Lucide React 0.462
- **UI Utilities**: Sonner (toast notifications)
- **Linting**: ESLint 9.32 with TypeScript support

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Feature-agnostic components (ProductCard, etc.)
│   ├── layout/          # Layout components (MobileLayout, BottomNav)
│   ├── ui/              # shadcn/ui component library
│   └── NavLink.tsx      # Navigation link component
├── pages/               # Screen/page components
│   ├── auth/            # Authentication screens
│   └── *.tsx            # Feature screens
├── context/             # React Context for state management
├── hooks/               # Custom React hooks
├── data/                # Mock data and constants
├── lib/                 # Utility functions and helpers
├── assets/              # Static assets
├── App.tsx              # Main app component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or bun

### Installation

```sh
# Clone the repository
git clone https://github.com/kernel37/test_wearwow.git

# Navigate to project directory
cd wearwow

# Install dependencies
npm install
# or
bun install
```

### Development

```sh
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Deployment

```sh
# Deploy to GitHub Pages
npm run deploy
```

## 🏗 Architecture

### State Management

The application uses React Context API for global state management:

- **AppContext**: Manages authentication, user data, cart, and wishlist
- **useApp Hook**: Custom hook to access AppContext

### Routing Structure

- **Public Routes**: `/login`, `/otp`, `/forgot-password`, `/reset-password`
- **Protected Routes**: All other routes require authentication
- Routes are guarded by `ProtectedRoute` component

### Component Organization

- **UI Components** (`components/ui/`): Reusable shadcn/ui components
- **Common Components** (`components/common/`): Business-specific components
- **Layout Components** (`components/layout/`): App structure and navigation
- **Page Components** (`pages/`): Full-screen views

## 📝 Development Guidelines

### Code Quality

- Use TypeScript strict mode
- Follow ESLint rules (run `npm run lint`)
- Add proper type annotations

### Naming Conventions

- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useCart`)
- **Utilities**: camelCase (e.g., `formatPrice`)
- **Types/Interfaces**: PascalCase (e.g., `Product`, `CartItem`)

### File Organization

- Keep components focused and single-purpose
- Co-locate related files
- Export from index files in subdirectories when appropriate

## 🔄 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a pull request

## 📄 License

This project is private and proprietary.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
