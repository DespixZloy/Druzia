import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SurveyResponse = {
  id?: string;
  user_name: string;
  user_email: string;
  question_1: string;
  question_2: number;
  question_3: string;
  question_4: string;
  created_at?: string;
};