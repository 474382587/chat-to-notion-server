import Redis from 'ioredis';

let cachedConnection: Redis | null = null;

const db = () => {
  if (cachedConnection) return cachedConnection;
  let client: Redis = new Redis(
    'redis://default:7de57c9882bf4ca0b8d923570e4f96cd@usw1-top-liger-33223.upstash.io:33223'
  );
  return (cachedConnection = client);
};

export default db;
