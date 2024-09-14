# React Convex , ConvexAuth, Shadcn , Tailwidn

## first of all create react typescript project with vite use these commands

```
npm create vite@latest my-project --template react-ts
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
#### add this into your  tsconfig.json 
```
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@convex/*": ["./convex/*"],
      // "@features/*": ["src/_features/*"],
      // "@providers/*": ["src/_workspace/lib/_providers/*"],
      // "@hooks/*": ["src/hooks/*"],
      // "@workspace/*": ["src/workspace/*"]
    }
  }
}
```
#### add this into your  tsconfig.app.json 
``` 
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "convex"]
  // add these later "convex", "features", "providers", "hooks", "workspace", "src/_hooks/use-toast.ts", "all-files/navbar", "all-files/blog-page.tsx", "all-files/newBlogsPage.tsx"
}
``` 

#### for resolve path error install this (so you can import "path" without error)

```
npm i -D @types/node
``` 


#### add this into your vite.config.ts 
``` 
import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@convex": path.resolve(__dirname, "./convex"), 
      // "@providers":path.resolve(__dirname, "./src/_providers"), 
      // "@features":path.resolve(__dirname, "./src/_features"),
      // "@hooks":path.resolve(__dirname, "./src/_features"),
      // "workspace":path.resolve(__dirname, "./src/_workspace")
    },
  },
})
``` 