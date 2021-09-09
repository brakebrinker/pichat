import DatabaseConfig from './database.config';

type ConfigArgs = {
  environment: string;
  port: number;
  database: Record<string, unknown>;
};

export default (): ConfigArgs =>
  <ConfigArgs>{
    environment: 'development',
    port: 3000,
    database: {
      ...DatabaseConfig(),
    },
  };
