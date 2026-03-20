// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss(),],
// })




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allow access from network
  },
  preview: {
    // host: 'learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host',
    host:'https://farebuzzer-travel-frontend.onrender.com',
    port: 5173, // or any allowed port
    strictPort: true,
    allowedHosts: [
      // 'learn-step-farebuzzertravel-frontend.skxdwz.easypanel.host'
      'https://farebuzzer-travel-frontend.onrender.com'
    ]
  }
})
