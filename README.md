# ShopEase — Modern E-Commerce Frontend

ShopEase is a clean, modern, and responsive e-commerce web application built with **React.js**, **Vite**, and **Tailwind CSS**, consuming data from the **Fake Store API**.

Designed as a production-grade portfolio project, ShopEase implements essential real-world e-commerce interactions—such as live search, category filtering, multi-order sorting, persistent local storage cart management, responsive drawers, and demo checkout flows—without backend complexity.

---

## 🌟 Key Features

### 1. Modern Minimalist UI & Responsive Design
- Clean layout with generous whitespace, subtle borders, soft shadows, and smooth transitions.
- Fully responsive across mobile, tablet, and desktop screens with a mobile navigation drawer.
- Accessible typography powered by Google's Inter font.
- Refined color system using an Indigo accent palette and neutral slate backgrounds.

### 2. Product Catalog & Live Data
- Fetches real-time products and categories directly from `https://fakestoreapi.com`.
- Reusable product cards featuring product imagery, category badges, star ratings, review counts, and USD currency formatting.
- Smooth loading skeleton cards and comprehensive error handling with retry capability.

### 3. Search, Filter & Sort Interactivity
- **Real-time Search:** Filter products by title or keywords on the fly.
- **Category Filter:** Dynamic pills derived from API categories, synchronized with URL query parameters (`/shop?category=electronics`).
- **Flexible Sorting:** Sort by *Default / Featured*, *Price: Low to High*, *Price: High to Low*, or *Customer Rating*.
- Cohesive filter reset and empty-state messaging when no products match.

### 4. Detailed Product Views & Related Items
- Individual product pages accessed at `/product/:id`.
- Dynamic breadcrumbs for easy category navigation.
- High-resolution product showcase with subtle hover zoom.
- Quantity selector (`-` and `+`) with min-limit protection.
- Related products recommendations from the same category.
- Graceful error screen for invalid product IDs with direct links back to the shop.

### 5. Persistent Shopping Cart State
- State managed through React Context API (`CartContext`).
- Auto-synchronized with browser `localStorage` (`shopease_cart`) so carts remain intact on page refreshes.
- Immediate item quantity updates and total recalculations.
- Prevents duplicate cart entries by increasing existing product quantities.
- Real-time item count badge on the Navbar with animations.
- Dynamic free shipping progress bar (unlocked at \$50+).

### 6. Demo Checkout Experience
- Interactive mock checkout form with shipping address validation and simulated payment method selection.
- Generates a confirmation receipt screen with order numbers and customer details.
- Automatically clears the cart upon successful order completion.

### 7. Fake Store API Demo Authentication
- Demonstrates integration with Fake Store API's `POST /auth/login` endpoint.
- One-click **Auto-fill Demo User** button (`johnd` / `m38rmF$`).
- Session stored locally with user avatar and sign-out controls.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18 / 19 (Vite)
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS (v3)
- **Routing:** React Router DOM (v7)
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **State Management:** React Context API + LocalStorage
- **Data Source:** [Fake Store API](https://fakestoreapi.com)

---

## 📁 Project Architecture

```
shopease/
├── public/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.jsx   # Horizontal category selection pills
│   │   ├── Footer.jsx           # Value propositions & site links
│   │   ├── Loading.jsx          # Skeletons for grid & product details
│   │   ├── Navbar.jsx           # Responsive header, cart counter, auth status
│   │   ├── ProductCard.jsx      # Product card with image, rating, add-to-cart
│   │   ├── ProductGrid.jsx      # Responsive grid with empty states
│   │   ├── ScrollToTop.jsx      # Instant route scroll restoration
│   │   └── SearchBar.jsx        # Search input with clear button
│   ├── context/
│   │   ├── AuthContext.jsx      # Demo authentication & session management
│   │   └── CartContext.jsx      # Cart items, totals, and localStorage sync
│   ├── pages/
│   │   ├── Cart.jsx             # Cart summary, quantity adjustment, totals
│   │   ├── Checkout.jsx         # Simulated checkout and receipt confirmation
│   │   ├── Home.jsx             # Hero, featured products, category showcase
│   │   ├── Login.jsx            # Demo login form with auto-fill credentials
│   │   ├── NotFound.jsx         # 404 page with navigation fallback
│   │   ├── ProductDetails.jsx   # Full product view & related items
│   │   └── Shop.jsx             # Catalog with search, filter, and sort
│   ├── services/
│   │   └── productApi.js        # Axios instance & FakeStore API methods
│   ├── App.jsx                  # Main routing & application layout
│   ├── index.css                # Tailwind directives & global styling
│   └── main.jsx                 # React root renderer
├── index.html                   # HTML template & Inter Google Font
├── tailwind.config.js           # Tailwind theme configuration
├── postcss.config.js            # PostCSS configuration
└── package.json                 # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed:
```bash
node -v
npm -v
```

### Installation
1. Clone or open the project directory:
```bash
cd shopease
```

2. Install dependencies:
```bash
npm install
```

3. Start the Vite development server:
```bash
npm run dev
```

4. Open your browser at the local server address (typically `http://localhost:5173`).

### Production Build
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📡 API Endpoints Used

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `https://fakestoreapi.com/products` | `GET` | Fetches all available products |
| `https://fakestoreapi.com/products/{id}` | `GET` | Fetches single product details |
| `https://fakestoreapi.com/products/categories` | `GET` | Retrieves all product categories |
| `https://fakestoreapi.com/products/category/{category}` | `GET` | Retrieves products belonging to a category |
| `https://fakestoreapi.com/auth/login` | `POST` | Authenticates demo user credentials |

---

## 💼 Interview Discussion Talking Points

When presenting this project in frontend interviews:

1. **State Management Rationale:** Explain why React Context API was chosen over Redux for this scope—it provides centralized state for cart and authentication without redundant boilerplate, perfectly matched with `localStorage` persistence.
2. **API Separation & Abstraction:** The `productApi.js` service layer cleanly decouples API logic from UI components, making it simple to mock or swap endpoints in the future.
3. **UX & Micro-interactions:** Mention skeleton loaders instead of jarring spinners, immediate "Added!" feedback on cart buttons, URL query parameter preservation for sharing filtered URLs, and automatic scroll restoration.
4. **Resilience & Defensive Coding:** Highlight how the application handles invalid product IDs, network errors, and empty search results gracefully.
