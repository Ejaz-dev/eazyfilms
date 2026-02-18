import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aldhokbjobuitamcsrnd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZGhva2Jqb2J1aXRhbWNzcm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNzQ5NjEsImV4cCI6MjA4Njk1MDk2MX0.vk3uZ0dUSfox_G-vEA-9BXST2qpVlPneg7CftaKVS4s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);