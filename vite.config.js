import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      external: ["fsevents"],
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/search.html"),

      },
    },
  },
});
