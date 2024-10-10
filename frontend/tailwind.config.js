/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "jetbrains": ['JetBrains Mono']
      },
      backgroundImage:{
        'gradient1' : 'linear-gradient(144deg, rgba(1,1,200,1) 3%, rgba(18,18,18,1) 23%, rgba(0,0,0,1) 100%)'
      }
    },
  },
  plugins: [],
}

