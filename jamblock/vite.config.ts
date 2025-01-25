// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Optional: Expose the server to external devices
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optimize chunking if needed
      },
    },
  }
}); 