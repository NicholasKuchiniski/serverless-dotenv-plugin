interface PluginManager {
  run: (hooks: string[]) => Promise<void>;
}
export interface Serverless {
  cli: {
    log: (message: string) => void;
  };
  service: {
    custom: {
      dotenv: Record<string, string>;
    };
  };
  pluginManager: PluginManager;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerlessOptions {}
