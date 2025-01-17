// src/env.d.ts
interface Window {
  _env_?: {
    REACT_APP_ACCESS_TOKEN: string;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ACCESS_TOKEN: string;
  }
}
  