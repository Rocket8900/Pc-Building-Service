
# ESDTimez PC Building Service - Customer Facing UI

## Frontend Overview

This section provides an overview of the frontend setup, technologies, and key features.

### Technologies Used

Our frontend is built using modern technologies and tools to ensure a smooth development experience and optimal performance:

- **Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Fetch API
- **Linting & Formatting**: ESLint, Prettier

### Features

The Customer Facing UI provides an intuitive interface for customers to build their custom PCs and manage their orders efficiently:

1. **Google Login**: Secure authentication via Google OAuth.
2. **Build a PC**: Guided process for selecting PC parts, adding them to the cart, and completing the checkout and payment.
3. **View Cart**: Easily view and manage items in the shopping cart.
4. **View Past Orders**: Access to past order history for reference.
5. **Recommendation System**: Utilizes past order data to provide personalized product recommendations.

### Instructions

Follow these steps to set up and run the Customer Facing UI:

1. Delete `node_modules` and `package-lock.json` if present.
2. Run `npm install` to reinstall dependencies and generate the `package-lock.json` file.
3. Run `npm run dev` to start the development server.
4. After launching, right-click on the page and select `Inspect` to open the developer tools.
5. Navigate to the `Application` tab, then the `Storage` section, and finally `Local Storage` under the appropriate `http://localhost:517X` entry (depending on whether you started the Customer or Employee UI first).
6. Ensure that there is no `AUTH_KEY` stored. If present, right-click and delete it.
7. Visit the Login page to access the Google sign-in plugin.

### Contributors

- Alexander Luk Wei Heng
- Clarissa Koh Shi Qi
- Gerard Emmanuel Loh Kai-Jyn
- Loh Yee Xun Gabriel
- Nashwyn Singh Sangah
- Shyan Cham

