/** @type {import('tailwindcss').Config} */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // server: {
  //   proxy: {
  //     '/api': "http://localhost:8000", // from backend 

  //   }
  // },
  plugins: [],
}

// export default defineConfig({

//   server: {
//     proxy: {
//       '/api': "http://localhost:8000", // from backend 

//     }
//   },
//   plugins: [react()],
// })