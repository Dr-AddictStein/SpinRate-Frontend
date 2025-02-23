// tailwind.config.js
export default {
    content: [
      "./index.html", 
      "./src/**/*.{js,jsx,ts,tsx}"  // This ensures Tailwind looks in your JSX/TSX files
    ],
    theme: {
      extend: {
        // Your customizations here
      },
    },
    plugins: [],
  }
  