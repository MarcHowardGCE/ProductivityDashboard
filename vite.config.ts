// Import the defineConfig function from Vite
// This function helps with type checking and IDE support
import { defineConfig } from 'vite';
// Import the React plugin for Vite
// This plugin enables support for React in the Vite build process
import react from '@vitejs/plugin-react';
// Import the resolve function from the path module
// This function is used to create absolute paths
import { resolve } from 'path';

// Export the Vite configuration
// The defineConfig function is used to define the configuration object
export default defineConfig({
  // Specify the plugins to be used by Vite
  plugins: [
    // Use the React plugin to enable support for React
    react()
  ],
  // Configure module resolution
  resolve: {
    alias: {
      // Create an alias for the global module
      // This is necessary to polyfill the global object in the browser environment
      global: resolve(__dirname, 'node_modules/global/')
    }
  },
  // Define global constants
  define: {
    // Define process.env as an empty object
    // This is necessary to avoid errors when accessing process.env in the browser
    'process.env': {},
    // Define global as globalThis
    // This polyfills the global object in the browser environment
    global: 'globalThis'
  }
});