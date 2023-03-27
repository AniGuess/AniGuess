export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      TEST_GUILD: string;
      API_URL: string;
    }
  }
}
