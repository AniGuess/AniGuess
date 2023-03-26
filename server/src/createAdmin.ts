import { User } from './db/entities/User';

export const createAdmin = async () => {
  const user = new User();
  user.username = process.env.ADMIN_USERNAME || 'admin';
  user.password = process.env.ADMIN_PASSWORD || 'admin';
  await user.save();
};
