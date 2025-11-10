export interface User {
  address: string;
  company_name: string;
  created_at: string;
  description: string;
  id: number;
  role: string;
  updated_at: string;
  username: string;
}

export interface EditUser {
  address?: string;
  company_name?: string;
  description?: string;
  username?: string;
}
