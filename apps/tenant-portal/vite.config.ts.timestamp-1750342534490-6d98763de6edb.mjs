// vite.config.ts
import { defineConfig } from "file:///C:/Users/gvhom/OneDrive/Documents/klubiq/klubiq-web/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/gvhom/OneDrive/Documents/klubiq/klubiq-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { VitePWA } from "file:///C:/Users/gvhom/OneDrive/Documents/klubiq/klubiq-web/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\gvhom\\OneDrive\\Documents\\klubiq\\klubiq-web\\apps\\tenant-portal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "Klubiq Tenant Portal",
        short_name: "Klubiq",
        description: "Property Management SAAS App for Tenants",
        theme_color: "#002147",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait"
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.klubiq\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 72 * 60 * 60
                // 72 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              matchOptions: {
                ignoreVary: true
              }
            }
          },
          {
            urlPattern: /^https:\/\/localhost:3000\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "local-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 72 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              matchOptions: {
                ignoreVary: true
              }
            }
          },
          {
            urlPattern: /^https:\/\/devapi\.klubiq\.com\/api\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "dev-api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 72 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              matchOptions: {
                ignoreVary: true
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60
                // 30 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: "module"
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3002,
    open: true,
    proxy: {
      "/api": {
        target: process.env.VITE_BASE_URL_DEV || "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    },
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: "dist",
    sourcemap: process.env.NODE_ENV === "development",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === "production",
        drop_debugger: process.env.NODE_ENV === "production"
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          mui: ["@mui/material", "@mui/icons-material"]
        }
      }
    }
  },
  optimizeDeps: {
    include: ["@klubiq/ui-components"],
    exclude: ["@klubiq/ui-components/dist"]
  },
  css: {
    devSourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxndmhvbVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxca2x1YmlxXFxcXGtsdWJpcS13ZWJcXFxcYXBwc1xcXFx0ZW5hbnQtcG9ydGFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxndmhvbVxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxca2x1YmlxXFxcXGtsdWJpcS13ZWJcXFxcYXBwc1xcXFx0ZW5hbnQtcG9ydGFsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ndmhvbS9PbmVEcml2ZS9Eb2N1bWVudHMva2x1YmlxL2tsdWJpcS13ZWIvYXBwcy90ZW5hbnQtcG9ydGFsL3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdHJlYWN0KCksXHJcblx0XHRWaXRlUFdBKHtcclxuXHRcdFx0cmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcclxuXHRcdFx0bWFuaWZlc3Q6IHtcclxuXHRcdFx0XHRuYW1lOiAnS2x1YmlxIFRlbmFudCBQb3J0YWwnLFxyXG5cdFx0XHRcdHNob3J0X25hbWU6ICdLbHViaXEnLFxyXG5cdFx0XHRcdGRlc2NyaXB0aW9uOiAnUHJvcGVydHkgTWFuYWdlbWVudCBTQUFTIEFwcCBmb3IgVGVuYW50cycsXHJcblx0XHRcdFx0dGhlbWVfY29sb3I6ICcjMDAyMTQ3JyxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kX2NvbG9yOiAnI0ZGRkZGRicsXHJcblx0XHRcdFx0ZGlzcGxheTogJ3N0YW5kYWxvbmUnLFxyXG5cdFx0XHRcdHNjb3BlOiAnLycsXHJcblx0XHRcdFx0c3RhcnRfdXJsOiAnLycsXHJcblx0XHRcdFx0b3JpZW50YXRpb246ICdwb3J0cmFpdCdcclxuXHRcdFx0fSxcclxuXHRcdFx0d29ya2JveDoge1xyXG5cdFx0XHRcdGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuXHRcdFx0XHRzb3VyY2VtYXA6IHRydWUsXHJcblx0XHRcdFx0cnVudGltZUNhY2hpbmc6IFtcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dXJsUGF0dGVybjogL15odHRwczpcXC9cXC9hcGlcXC5rbHViaXFcXC5jb21cXC8uKi9pLFxyXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiAnTmV0d29ya0ZpcnN0JyxcclxuXHRcdFx0XHRcdFx0b3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHRcdGNhY2hlTmFtZTogJ2FwaS1jYWNoZScsXHJcblx0XHRcdFx0XHRcdFx0ZXhwaXJhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0bWF4RW50cmllczogMTAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWF4QWdlU2Vjb25kczogNzIgKiA2MCAqIDYwLCAvLyA3MiBob3Vyc1xyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0Y2FjaGVhYmxlUmVzcG9uc2U6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c2VzOiBbMCwgMjAwXSxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdG1hdGNoT3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWdub3JlVmFyeTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dXJsUGF0dGVybjogL15odHRwczpcXC9cXC9sb2NhbGhvc3Q6MzAwMFxcL2FwaVxcLy4qL2ksXHJcblx0XHRcdFx0XHRcdGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxyXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdFx0Y2FjaGVOYW1lOiAnbG9jYWwtYXBpLWNhY2hlJyxcclxuXHRcdFx0XHRcdFx0XHRleHBpcmF0aW9uOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRtYXhFbnRyaWVzOiAxMDAsXHJcblx0XHRcdFx0XHRcdFx0XHRtYXhBZ2VTZWNvbmRzOiA3MiAqIDYwICogNjAsXHJcblx0XHRcdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdFx0XHRjYWNoZWFibGVSZXNwb25zZToge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3RhdHVzZXM6IFswLCAyMDBdLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0bWF0Y2hPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRpZ25vcmVWYXJ5OiB0cnVlLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR1cmxQYXR0ZXJuOiAvXmh0dHBzOlxcL1xcL2RldmFwaVxcLmtsdWJpcVxcLmNvbVxcL2FwaVxcLy4qL2ksXHJcblx0XHRcdFx0XHRcdGhhbmRsZXI6ICdOZXR3b3JrRmlyc3QnLFxyXG5cdFx0XHRcdFx0XHRvcHRpb25zOiB7XHJcblx0XHRcdFx0XHRcdFx0Y2FjaGVOYW1lOiAnZGV2LWFwaS1jYWNoZScsXHJcblx0XHRcdFx0XHRcdFx0ZXhwaXJhdGlvbjoge1xyXG5cdFx0XHRcdFx0XHRcdFx0bWF4RW50cmllczogMTAwLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWF4QWdlU2Vjb25kczogNzIgKiA2MCAqIDYwLFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0Y2FjaGVhYmxlUmVzcG9uc2U6IHtcclxuXHRcdFx0XHRcdFx0XHRcdHN0YXR1c2VzOiBbMCwgMjAwXSxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdG1hdGNoT3B0aW9uczoge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWdub3JlVmFyeTogdHJ1ZSxcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dXJsUGF0dGVybjogL1xcLig/OnBuZ3xqcGd8anBlZ3xzdmd8Z2lmKSQvLFxyXG5cdFx0XHRcdFx0XHRoYW5kbGVyOiAnQ2FjaGVGaXJzdCcsXHJcblx0XHRcdFx0XHRcdG9wdGlvbnM6IHtcclxuXHRcdFx0XHRcdFx0XHRjYWNoZU5hbWU6ICdpbWFnZXMnLFxyXG5cdFx0XHRcdFx0XHRcdGV4cGlyYXRpb246IHtcclxuXHRcdFx0XHRcdFx0XHRcdG1heEVudHJpZXM6IDYwLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWF4QWdlU2Vjb25kczogMzAgKiAyNCAqIDYwICogNjAgLy8gMzAgZGF5c1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZGV2T3B0aW9uczoge1xyXG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXHJcblx0XHRcdFx0dHlwZTogJ21vZHVsZSdcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRdLFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRwb3J0OiAzMDAyLFxyXG5cdFx0b3BlbjogdHJ1ZSxcclxuXHRcdHByb3h5OiB7XHJcblx0XHRcdCcvYXBpJzoge1xyXG5cdFx0XHRcdHRhcmdldDogcHJvY2Vzcy5lbnYuVklURV9CQVNFX1VSTF9ERVYgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcblx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxyXG5cdFx0XHRcdHNlY3VyZTogZmFsc2UsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0aG1yOiB7XHJcblx0XHRcdG92ZXJsYXk6IHRydWUsXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0YnVpbGQ6IHtcclxuXHRcdG91dERpcjogJ2Rpc3QnLFxyXG5cdFx0c291cmNlbWFwOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcclxuXHRcdG1pbmlmeTogJ3RlcnNlcicsXHJcblx0XHR0ZXJzZXJPcHRpb25zOiB7XHJcblx0XHRcdGNvbXByZXNzOiB7XHJcblx0XHRcdFx0ZHJvcF9jb25zb2xlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nLFxyXG5cdFx0XHRcdGRyb3BfZGVidWdnZXI6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0XHRtYW51YWxDaHVua3M6IHtcclxuXHRcdFx0XHRcdHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG5cdFx0XHRcdFx0bXVpOiBbJ0BtdWkvbWF0ZXJpYWwnLCAnQG11aS9pY29ucy1tYXRlcmlhbCddLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0b3B0aW1pemVEZXBzOiB7XHJcblx0XHRpbmNsdWRlOiBbJ0BrbHViaXEvdWktY29tcG9uZW50cyddLFxyXG5cdFx0ZXhjbHVkZTogWydAa2x1YmlxL3VpLWNvbXBvbmVudHMvZGlzdCddLFxyXG5cdH0sXHJcblx0Y3NzOiB7XHJcblx0XHRkZXZTb3VyY2VtYXA6IHRydWUsXHJcblx0fSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxhQUFhO0FBQUEsTUFDZDtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1IsdUJBQXVCO0FBQUEsUUFDdkIsV0FBVztBQUFBLFFBQ1gsZ0JBQWdCO0FBQUEsVUFDZjtBQUFBLFlBQ0MsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1IsV0FBVztBQUFBLGNBQ1gsWUFBWTtBQUFBLGdCQUNYLFlBQVk7QUFBQSxnQkFDWixlQUFlLEtBQUssS0FBSztBQUFBO0FBQUEsY0FDMUI7QUFBQSxjQUNBLG1CQUFtQjtBQUFBLGdCQUNsQixVQUFVLENBQUMsR0FBRyxHQUFHO0FBQUEsY0FDbEI7QUFBQSxjQUNBLGNBQWM7QUFBQSxnQkFDYixZQUFZO0FBQUEsY0FDYjtBQUFBLFlBQ0Q7QUFBQSxVQUNEO0FBQUEsVUFDQTtBQUFBLFlBQ0MsWUFBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBQ1QsU0FBUztBQUFBLGNBQ1Is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
