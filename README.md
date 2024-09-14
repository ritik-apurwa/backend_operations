# React Convex , ConvexAuth, Shadcn , Tailwidn

## first of all create react typescript project with vite use these commands

```
npm create vite@latest

```

#### install tailwind and postcss and autoprefixer

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```
#### configure tailwind.config.js to ts and add the following content
 
 ``` 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

``` 

#### in your main css file add this @tailwind directives 

``` 
@tailwind base;
@tailwind components;
@tailwind utilities;

``` 
