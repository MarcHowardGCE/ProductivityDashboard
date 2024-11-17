module.exports = {
  // Specify the paths to all of the template files in the project
  // Tailwind will scan these files for class names to generate the necessary styles
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  
  // Customize the default theme
  theme: {
    // Extend the default theme with custom values
    // This is where you can add custom colors, fonts, spacing, etc.
    extend: {}
  },
  
  // Add any plugins that you want to use with Tailwind CSS
  // Plugins can add additional utilities, components, or base styles
  plugins: []
};