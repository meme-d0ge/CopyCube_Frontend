import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,js,tsx}"],

  theme: {
    extend: {
      colors: {
        lightGray: '#d1d1d1',
      },
      fontWeight:{
        b: '700',
        sb: '600',
        m: '500',
        r: '400',
        l: '300'
      },
      fontSize:{
        h1: '64px',
        h2: '48px',
        h3: '40px',
        h4: '36px',
        h5: '32px',
        h6: '28px',
        h7: '20px',
        h8: '18px',
        h9: '16px',
        h10: '14px',
      }
    },
  },
  plugins: [],
} satisfies Config;
