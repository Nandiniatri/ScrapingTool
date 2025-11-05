import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlezesnrywymoobhejat.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZXplc25yeXd5bW9vYmhlamF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MzM0OTcsImV4cCI6MjA3MTUwOTQ5N30.oEsxb5vmeKUHRvG7wu87r41jhvFQLCqzuaOy2e3xQx4';

export const supabase = createClient(supabaseUrl, supabaseKey);
