import { cleanEnv, port, str } from 'envalid';

const validateEnv = (): void => {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    MONGO_DB: str(),
    PORT: port(),
    BLING_API_URL: str(),
    BLING_API_KEY: str(),
    PIPEDRIVE_API_URL: str(),
    PIPEDRIVE_API_KEY: str(),
  });
};

export default validateEnv;
