export interface ServerConfig {
  server: {
    port: number;
  };
  stockApi: {
    url: string;
    apiKey: string;
  };
  cors: {
    origin: string | string[];
  };
  awesomeapi: {
    url: string;
  };
}
