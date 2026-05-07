import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export async function getSongs() { const { data } = await supabase.from('songs').select('*').order('created_at', { ascending: false }); return data || []; }
export async function searchSongs(q: string) { const { data } = await supabase.from('songs').select('*').or(`title.ilike.%${q}%,artist.ilike.%${q}%`); return data || []; }
export async function getUserPlaylists(userId: string) { const { data } = await supabase.from('playlists').select('*').eq('user_id', userId); return data || []; }
