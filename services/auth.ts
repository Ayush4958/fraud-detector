import { supabase } from "@/lib/supabaseClient";

// Signing up a new user
export async function signup(email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { data, error };
    }
    catch (error: string | any) {
        console.error("Error while Sign up :- ", error);
    }
}

// Logging in a existing user
export async function login(email: string, password: string) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    }
    catch (error: string | any) {
        console.error("Error while Login :- ", error);
    }
}

// Logging out the current user
export async function logout() {
    try {
        const { error } = await supabase.auth.signOut();
        return { error };
    }
    catch (error: string | any) {
        console.error("Error while Logging Out :- ", error);
    }
}

// Fetching the current user
export async function getUser() {
    try {
        const { data, error } = await supabase.auth.getUser();
        return { data, error };
    }
    catch (error: string | any) {
        console.error("Error while Fetching User :- ", error);
    }
}

// Updating the user's password
export async function updatePassword(newPassword: string) {
    try {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        return { data, error };
    }

    catch (error: string | any) {
        console.error("Error while Updating User's Password :- ", error);
    }
}

// Sending a password reset email
export async function sendPasswordReset(email: string) {
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        return { data, error };
    }
    catch (error: string | any) {
        console.error("Error while sending password reset email :- ", error);
    }
}
