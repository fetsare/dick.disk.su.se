export type UserRole = 'admin' | 'member';

export type UserDb = {
  id: string; //uuid
  email: string;
  name: string;
  password_hash: string | null;
  role: UserRole;
  created_at: Date | string;
  is_active: boolean;
  profile_image_url?: string | null;
};

export type User = Omit<UserDb, 'password_hash'>;
