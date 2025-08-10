/// <reference types="vite/client" />
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
});
