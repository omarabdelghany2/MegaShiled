/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    backgroundImage: {
      img1: "url('https://megashieldeg.com/static/public/car1.jpg')",
      img2: "url('https://megashieldeg.com/static/public/car2.jpg')",
      img3: "url('https://megashieldeg.com/static/public/car3.jpg')",
      img4: "url('https://megashieldeg.com/static/public/car4.jpg')",
      img5: "url('https://megashieldeg.com/static/public/car5.jpg')",
      img6: "url('https://megashieldeg.com/static/public/car6.jpg')",
      "img1-s": "url('https://megashieldeg.com/static/public/films.png')",
      "img2-s": "url('https://megashieldeg.com/static/public/nano.jpg')",
      "img3-s": "url('https://megashieldeg.com/static/public/paint-protection.png')",
      "img4-s": "url('https://megashieldeg.com/static/public/polish.jpg')",
      "img5-s": "url('https://megashieldeg.com/static/public/glass.jpg')",
      "img6-s": "url('https://megashieldeg.com/static/public/car6-s.jpeg')",
      main: "url('https://megashieldeg.com/static/public/landing.jpg')",
      carCabin: "url('https://megashieldeg.com/static/public/landing.jpg')",
      wheel: "url('https://megashieldeg.com/static/public/reserve.png')",
      shopping: "url('https://megashieldeg.com/static/public/shopping.png')",
      welcome: "url('https://megashieldeg.com/static/public/welcome.jpg')",
      carbon: "url('https://megashieldeg.com/static/public/carpon.webp')",
      who: "url('https://megashieldeg.com/static/public/whoAreUs.jpg')",
      map: "url('https://megashieldeg.com/static/public/map.jpg')",
      "opaque-gradient":
        "linear-gradient(to left, rgba(0,67,116,0.6) -26.48%, rgba(0,51,102,0.6) 73.52%)",
      room: "url('https://megashieldeg.com/static/public/3882.webp')",
      package: "url('https://megashieldeg.com/static/public/package-bg.jpg')",
      "blue-red":
        "linear-gradient(to right, #f43b48 0%, #453a94 100%)",
    },
    fontFamily: {
      arabic: '"Almarai", sans-serif',
      landing: "Bebas Neue, sans-serif"
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      boxShadow: {
        blur: "#424584 0px 7px 29px 0px",
        box: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "primary-gray": "#69696F",
        "light-gray": "#E4E4E7",
        primary: {
          DEFAULT: "#E62E2D",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
