import { users } from './data';
import { createId } from './data';
import { generateToken } from '@/utils/jwt';

export const AuthService = {
  register(email: string, password: string) {
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error('User already exists');
    const user = { id: createId(), email, passwordHash: password };
    users.push(user);
    const token = generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email }, token };
  },
  login(email: string, password: string) {
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (!user) throw new Error('Invalid credentials');
    const token = generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email }, token };
  }
};


