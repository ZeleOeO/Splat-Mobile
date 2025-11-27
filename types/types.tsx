export interface Bill {
  unique_id: string;
  title: string;
  description: string | null;
  total_amount: number;
  status: 'open' | 'paid' | 'closed';
  category: string;
  created_at: string;
  due_date: string;
}

export type User  = {
    unique_id: string;
    user_name: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
} | null
