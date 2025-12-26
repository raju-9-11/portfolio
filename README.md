# Retro/Cyberpunk Portfolio

A modern, responsive portfolio website built with React and Vite, featuring a "Cyberpunk/Bento Grid" aesthetic.

## Features

- **Cyberpunk Aesthetic**: Neon colors, pixel borders, scanlines, and glitch effects.
- **Bento Grid Layout**: Responsive CSS Grid layout that adapts from mobile to desktop.
- **Dynamic Data**: All content (Profile, Experience, Projects) is driven by `src/data/portfolio.js`.
- **Contact Form**: Integrated UI for contact, ready to be connected to EmailJS.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` (or the port shown in terminal) to view the app.

4.  **Build for Production**:
    ```bash
    npm run build
    ```

## Customization

-   **Data**: Edit `src/data/portfolio.js` to update your bio, skills, experience, and projects.
-   **Email Service**: Implement the actual email sending logic in `src/services/emailService.js` (e.g., using EmailJS).
-   **Styles**: Tweaking CSS variables in `src/styles/GlobalStyle.js` allows for easy theme changes.

## License

MIT
