/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parva: {
          wine: {
            DEFAULT: '#581825',
            50: '#FAF2F4',
            100: '#F4E3E7',
            200: '#ECC7D0',
            300: '#DF9FB0',
            400: '#CB6A85',
            500: '#B04162',
            600: '#8A2744',
            700: '#6E1F36',
            800: '#581825',
            900: '#42121C',
            950: '#2A0A11',
          },
          ivory: {
            DEFAULT: '#FAF8F5',
            50: '#FCFBF9',
            100: '#FAF8F5',
            200: '#F5EFEB',
            300: '#EDE4DC',
            400: '#DFD2C4',
            500: '#CEBDAA',
            border: '#E7DFD5',
            card: '#FFFFFF',
          },
          charcoal: {
            DEFAULT: '#221F20',
            light: '#4A4646',
            muted: '#78716C',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
