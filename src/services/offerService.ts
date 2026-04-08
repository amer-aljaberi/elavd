import { supabaseBrowser } from '@/lib/supabase/client';

export type Offer = {
    id: string;
    type: string;
    image_url: string;
    link: string;
    position: number;
    is_active: boolean;
    category_id?: string;
    sub_category_id?: string;
    product_id?: string;
};

export async function getOffers() {
    const { data } = await supabaseBrowser
        .from('offers')
        .select('*, sub_categories(name_en, name_ar)')
        .eq('is_active', true)
        .order('position', { ascending: true });

    return (data || []) as Offer[];
}
