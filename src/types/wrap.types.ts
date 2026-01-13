export interface WrapInput {
  wrap_type: string;
  wrap_location: string;
  wrap_status: string;
}

export interface Wraps {
  created_at: string;
  id: string;
  updated_at: string;
  wrap_id: string;
  wrap_location: string;
  wrap_status: string;
  wrap_type: string;
}

export interface WrapItem {
  created_at: string;
  id: string;
  degradation_percentage: number;
  updated_at: string;
  wrap_id: string;
  wrap_location: string;
  wrap_status: string;
  wrap_type: string;
}

export type WrapResponse = WrapItem[];
