/// <reference types="vite/client" />


interface ImportMetaEnv {
    // readonly VITE_SERVER: string;
    readonly VITE_SERVER : "http://localhost:4000"
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  