import { users } from './data';
import { createId } from './data';
import { generateToken } from '@/utils/jwt';
import { UserRole } from '@/types/entities';

export const AuthService = {
  register(email: string, password: string, role: UserRole = 'user', specialization?: string) {
    const exists = users.find(u => u.email === email);
    if (exists) throw new Error('User already exists');
    let user: any = { id: createId(), email, passwordHash: password, role };
    if (role === 'lawyer' && specialization) {
      user.specialization = specialization;
      user.appointedCaseIds = [];
    }
    users.push(user);
    const token = generateToken(user.id, user.email, user.role);
    return { user: { id: user.id, email: user.email, role: user.role, specialization: user.specialization }, token };
  },
  login(email: string, password: string) {
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (!user) throw new Error('Invalid credentials');
    const token = generateToken(user.id, user.email, user.role);
    return { user: { id: user.id, email: user.email, role: user.role }, token };
  }
};


