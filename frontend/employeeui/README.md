Here's an improved version of your README:

```markdown
# ESDTimez PC Building Service - Employee Facing UI

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

The Employee Facing UI offers a range of functionalities tailored for employees to efficiently manage repair tasks and orders:

1. **Google Login**: Secure authentication via Google OAuth.
2. **Repair Management**:
   - View all repair submissions by customers.
   - Handle the entire repair flow, including assigning repair cases, indicating damaged parts, and marking repairs as finished.
3. **View Logs**: Access logs for tracking activities and debugging.
4. **View Orders**: Monitor and manage customer orders seamlessly.

### Instructions

Follow these steps to set up and run the Employee Facing UI:

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
```
