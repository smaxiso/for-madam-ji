/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  
  theme: {
    extend: {
      // Colors
      colors: {
        blush: '#FF9AB1',
        peach: '#FFD29E',
        'soft-rose': '#FF7AB6',
        cream: '#FFF6EE',
        'muted-grey': '#6B7280',
      },
      
      // Font Family
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      
      // Animations
      animation: {
        'heart-float': 'heartFloat 1.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite'
      },
      
      // Keyframes
      keyframes: {
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      
      // Backdrop Blur
      backdropBlur: {
        xs: '2px'
      },
      
      // Box Shadow
      boxShadow: {
        'glass-sm': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'glass-md': '0 8px 12px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'glass-xl': '0 16px 32px rgba(0, 0, 0, 0.2)'
      },
      
      // Z-index scale
      zIndex: {
        'modal': 1000,
        'popover': 900,
        'dropdown': 800,
        'sticky': 700,
        'fixed': 600,
        'overlay': 500
      }
    }
  },
  
  plugins: []
};
