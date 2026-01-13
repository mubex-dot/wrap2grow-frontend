export interface User {
  created_at: string;
  email: string;
  farm_coordinate: string;
  farm_location: string;
  id: string;
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

export interface Pagination {
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
  per_page: number;
  total: number;
  total_pages: number;
}
