/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F8FF',
          100: '#E0F0FE',
          200: '#BAE0FD',
          300: '#7CC4FA',
          400: '#38A5F6',
          500: '#0194F3', // Traveloka Blue
          600: '#007CE8',
          700: '#0064D2',
          800: '#0050A8',
          900: '#064486',
        },
        cta: {
          DEFAULT: '#FF5E1F', // Coral Orange
          hover: '#E04D14',
          light: '#FFF4EE',
          border: '#FFD7C7',
        },
        success: {
          DEFAULT: '#10B981', // Emerald Green
          light: '#ECFDF5',
          border: '#A7F3D0',
        },
        rating: {
          DEFAULT: '#F59E0B', // Amber
          light: '#FEF3C7',
        },
        discount: {
          DEFAULT: '#F43F5E', // Rose Red
          light: '#FFF1F2',
          dark: '#BE123C',
        },
        page: '#F8FAFC',
        canvas: '#F1F5F9',
        heading: '#0F172A',
        body: '#475569',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 2px 8px -1px rgba(15, 23, 42, 0.07), 0 1px 4px -1px rgba(15, 23, 42, 0.04)',
        'float': '0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        'modal': '0 24px 60px -12px rgba(15, 23, 42, 0.25)',
      }
    },
  },
  plugins: [],
}
