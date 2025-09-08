/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'barebone-pulse':'barebonePulse 3s infinite',
        'message-slide':'slideIn 350ms',
        'bounce1': '2s bounce1 0s forwards infinite',
        'bounce2': '2s bounce2 0.4s forwards infinite',
        'bounce3': '2s bounce3 0.8s forwards infinite',
        'slide-road': '20s slide linear infinite',
        'slide-landscape': '40s slide linear infinite',
        'slide-clouds': '55s slide linear infinite',
        'bounce-car': '10s bounceX linear infinite',
        'left-to-right': 'LeftToRight 10s infinite linear',
        'scrollX': 'scrollX 40s linear infinite',

        'left-slide': '150s slide linear infinite',
        'right-slide': '150s slide linear infinite reverse',
      },
      keyframes: {
        barebonePulse: {
          '0%, 100%': {
            opacity:1,
          },
          '50%': {
            opacity:0.5,
          }
        },
        slideIn: {
          "0%": {
              transform: "translateY(10%)"
          },
          "100%": {
              transform: "translateY(0%)"
          }
        },
        bounce1: {
          "0%": { transform: "translateY(0%)" },
          "15%": { transform: "translateY(-25%)" },
          "30%": { transform: "translateY(20%)" },
          "45%": { transform: "translateY(-15%)" },
          "60%": { transform: "translateY(10%)" },
          "75%": { transform: "translateY(-5%)" },
          "100%": { transform: "translateY(0%)" },
        },
        bounce2: {
          "0%": { transform: "translateY(0%)" },
          "15%": { transform: "translateY(-25%)" },
          "30%": { transform: "translateY(20%)" },
          "45%": { transform: "translateY(-15%)" },
          "60%": { transform: "translateY(10%)" },
          "75%": { transform: "translateY(-5%)" },
          "100%": { transform: "translateY(0%)" },
        },
        bounce3: {
          "0%": { transform: "translateY(0%)" },
          "15%": { transform: "translateY(-30%)" },
          "30%": { transform: "translateY(25%)" },
          "45%": { transform: "translateY(-20%)" },
          "60%": { transform: "translateY(15%)" },
          "75%": { transform: "translateY(-10%)" },
          "100%": { transform: "translateY(0%)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-3840px)" },
        },
        bounceX: {
          "0%": { left: "25%" },
          "70%": { left: "35%" },
          "85%": { left: "30%" },
          "100%": { left: "25%" },
        },
        LeftToRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        scrollX: {
          "to": {
            transform: "translate(calc(-50% - 0.5rem))"
          }
        }
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
