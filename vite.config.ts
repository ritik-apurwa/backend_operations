import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@convex": path.resolve(__dirname, "./convex"), 
      // "@providers":path.resolve(__dirname, "./src/_providers"), 
      // "@features":path.resolve(__dirname, "./src/_features"),
      // "@hooks":path.resolve(__dirname, "./src/_features"),
      // "workspace":path.resolve(__dirname, "./src/_workspace")
    },
  },
})