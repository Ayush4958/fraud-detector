import { supabase } from "../lib/supabase.js";

export async function getUser(req) {
  try {
    const header = req.headers.authorization;

    if (!header) return null;

    const token = header.replace("Bearer ", "");

    const { data, error } = await supabase.auth.getUser(token);

    if (error) return null;

    return data.user;
  } 
  catch (err) {
    console.log("Backend Auth Error:", err);
    return null;
  }
}
