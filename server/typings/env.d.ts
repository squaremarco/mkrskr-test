declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_HOST: string;
    MONGO_PORT: string;
    MONGO_DATABASE: string;
    HOST: string;
    PORT: string;
  }
}
