export type UserRole = 'admin' | 'member';

export type UserDb = {
  id: string; //uuid
  email: string;
  name: string;
  slug: string;
  password_hash: string | null;
  role: UserRole;
  created_at: Date | string;
  is_active: boolean;
  title: string;
  profile_image_url?: string | null;
  description?: string | null;
  colonist_link?: string | null;
};

export type User = Omit<UserDb, 'password_hash'>;
