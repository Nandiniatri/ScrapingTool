import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fpneshrtkhuwezkwojnk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbmVzaHJ0a2h1d2V6a3dvam5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MTc1NjEsImV4cCI6MjA3Nzk5MzU2MX0.nhO9nP6t3hFFsFyAJEtOA0E16-Cf5EykwR0mvi87Chk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
