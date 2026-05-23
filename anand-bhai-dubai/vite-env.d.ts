declare module '@tailwindcss/vite' {
  const plugin: any;
  export default plugin;
}
declare module '@vitejs/plugin-react' {
  const plugin: any;
  export default plugin;
}
declare module 'vite' {
  export function defineConfig(config: any): any;
  export function defineConfig(config: () => any): any;
}
declare module 'path' {
  export function resolve(...pathSegments: string[]): string;
  const path: {
    resolve: (...pathSegments: string[]) => string;
  };
  export default path;
}
declare const __dirname: string;
declare namespace NodeJS {
  interface ProcessEnv {
    DISABLE_HMR?: string;
    [key: string]: string | undefined;
  }
  interface Process {
    env: ProcessEnv;
  }
}
declare const process: NodeJS.Process;
