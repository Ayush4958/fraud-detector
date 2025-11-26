import { supabase } from "@/lib/supabaseClient";

interface AuthResponse<T = any> {
  data: T | null;
  error: any | null;
}

// Signing up a new user
export async function signup(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

// Logging in an existing user
export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Logging out current user
export async function logout(): Promise<AuthResponse> {
  const { error } = await supabase.auth.signOut();
  return { data: null, error };
}

// Fetching current user
export async function getUser(): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
}

// Updating user password
export async function updatePassword(newPassword: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });
  return { data, error };
}

// Sending password reset email
export async function sendPasswordReset(email: string): Promise<AuthResponse> {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}
