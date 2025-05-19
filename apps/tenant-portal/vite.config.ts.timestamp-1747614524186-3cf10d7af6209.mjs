// vite.config.ts
import { defineConfig } from "file:///C:/Users/gvhom/OneDrive/Documents/klubiq/klubiq-web/apps/tenant-portal/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/gvhom/OneDrive/Documents/klubiq/klubiq-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\gvhom\\OneDrive\\Documents\\klubiq\\klubiq-web\\apps\\tenant-portal";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3002,
    open: true
  },
  build: {
    outDir: "dist",
    sourcemap: true
    // commonjsOptions: {
    //   include: [/@klubiq\/ui-components/, /node_modules/],
    // },
  },
  optimizeDeps: {
    include: ["@klubiq/ui-components"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxndmhvbVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxca2x1YmlxXFxcXGtsdWJpcS13ZWJcXFxcYXBwc1xcXFx0ZW5hbnQtcG9ydGFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxndmhvbVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxca2x1YmlxXFxcXGtsdWJpcS13ZWJcXFxcYXBwc1xcXFx0ZW5hbnQtcG9ydGFsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ndmhvbS9PbmVEcml2ZS9Eb2N1bWVudHMva2x1YmlxL2tsdWJpcS13ZWIvYXBwcy90ZW5hbnQtcG9ydGFsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDIsXHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgc291cmNlbWFwOiB0cnVlLFxyXG4gICAgLy8gY29tbW9uanNPcHRpb25zOiB7XHJcbiAgICAvLyAgIGluY2x1ZGU6IFsvQGtsdWJpcVxcL3VpLWNvbXBvbmVudHMvLCAvbm9kZV9tb2R1bGVzL10sXHJcbiAgICAvLyB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ0BrbHViaXEvdWktY29tcG9uZW50cyddLFxyXG4gIH0sXHJcbn0pICJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1osU0FBUyxvQkFBb0I7QUFDbmIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUliO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsdUJBQXVCO0FBQUEsRUFDbkM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
