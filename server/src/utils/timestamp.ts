export const timestamp = () => (process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp');
