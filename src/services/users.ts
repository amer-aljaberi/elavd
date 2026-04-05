"use server";

import { getServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = getServerSupabase();

export async function getUsers() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }
    return data;
}

export async function updateUser(id: string, updates: any) {
    try {
        console.log('UPDATING USER:', id, updates);
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select();

        if (error) {
            console.error('SERVER ACTION UPDATE ERROR:', error);
            return { success: false, error: error.message };
        }
        
        revalidatePath('/admin/users', 'layout');
        return { success: true, data };
    } catch (err: any) {
        console.error('CRITICAL UPDATE ERROR:', err);
        return { success: false, error: err.message || 'Unknown error occurred' };
    }
}
