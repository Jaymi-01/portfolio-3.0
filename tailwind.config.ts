// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  // 1. CRITICAL: Switch dark mode to class strategy for scroll-based switching
  darkMode: 'class', 
  
  // 2. Ensure Tailwind scans your React files (Vite default is often sufficient)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        // 3. Define your custom semantic colors here
        'bg-light': '#F7F7F7',      
        'bg-dark': '#1C1C1C',       
        'text-light': '#1A1A1A',    
        'text-dark': '#EBEBEB',     
        'primary-accent': '#007ACC', 
      }
    },
  },
  plugins: [],
}

export default config