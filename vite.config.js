import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.VITE_NODE_ENV || "development"),
      API_URL: JSON.stringify(
        process.env.VITE_API_URL || "http://localhost:3000"
      ),
    },
  },
  build: {
    lib: {
      entry: "src/main.jsx",
      name: "QuoteWidget",
      fileName: "container-quote-widget",
      formats: ["umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "container-quote-widget.css";
          }
          if (assetInfo.name.match(/\.(png|jpe?g|gif|svg)$/)) {
            return "images/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
  publicDir: "public",
  base: "./",
});
