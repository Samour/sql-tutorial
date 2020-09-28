export interface IConfig {
  server: {
    port: number;
  };
  database: {
    host: string;
    user: string;
    password?: string;
    database: string;
  };
}

const config: IConfig = {
  server: {
    port: 8080,
  },
  database: {
    host: 'localhost',
    user: 'app_be',
    database: 'poll_app',
    password: '23tfKZSLwDsY',
  },
};

export async function loadConfig(): Promise<IConfig> {
  return config;
}
