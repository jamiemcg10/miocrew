module.exports = {
  content: [
    './src/app/(app)/**/*.{js,ts,jsx,tsx}',
    './src/lib/components/**/*.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '30rem'
      }
    }
  },
  plugins: []
}
