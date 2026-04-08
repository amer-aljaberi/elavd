import { supabaseBrowser } from '@/lib/supabase/client';

export type Product = {
    id: string;
    name_en: string | null;
    name_ar: string | null;
    slug_en: string | null;
    slug_ar: string | null;
    main_image: string | null;
    short_desc_en: string | null;
    short_desc_ar: string | null;
    full_desc_en?: string | null;
    full_desc_ar?: string | null;
    price?: number | null;
    discount_price?: number | null;
    country_of_origin?: string | null;
    is_featured?: boolean;
    is_popular?: boolean;
    is_event?: boolean;
    is_active?: boolean;
    created_at?: string;
    category_id?: string;
    category?: {
        id: string;
        name_en: string | null;
        name_ar: string | null;
        slug: string | null;
    },
    sub_category_id?: string;
    sub_category?: {
        id: string;
        name_en: string | null;
        name_ar: string | null;
        slug: string | null;
    }
};

export async function getProductBySlug(slug: string) {
    const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    const filter = isUuid
        ? `slug_en.eq.${slug},slug_ar.eq.${slug},id.eq.${slug}`
        : `slug_en.eq.${slug},slug_ar.eq.${slug}`;

    const { data, error } = await supabaseBrowser
        .from('products')
        .select('*, category:categories(*), sub_category:sub_categories(*)')
        .or(filter)
        .limit(1);

    if (error) return null;
    return ((data && data[0]) || null) as Product | null;
}

export async function getProducts({ 
    is_featured, 
    is_popular, 
    categoryId,
    subCategoryId,
    limit = 20 
}: { 
    is_featured?: boolean, 
    is_popular?: boolean, 
    categoryId?: string,
    subCategoryId?: string,
    limit?: number 
}) {
    let query = supabaseBrowser.from('products').select('*, categories(*), sub_categories(*)');
    
    if (is_featured) query = query.eq('is_featured', true);
    if (is_popular) query = query.eq('is_popular', true);
    if (categoryId) query = query.eq('category_id', categoryId);
    if (subCategoryId) query = query.eq('sub_category_id', subCategoryId);
    
    const { data } = await query
        .order('created_at', { ascending: false })
        .limit(limit);

    return (data || []) as Product[];
}

export async function getFeaturedProducts(limit: number = 4) {
    return getProducts({ is_featured: true, limit });
}

export async function getRelatedProducts(product: Product, limit: number = 4) {
    if (!product?.category_id) return [];
    const prods = await getProducts({ categoryId: product.category_id, limit: Math.max(limit + 1, 8) });
    return prods.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function searchProducts({
    query,
    categoryId,
    subCategoryId,
    limit = 10
}: {
    query: string;
    categoryId?: string;
    subCategoryId?: string;
    limit?: number;
}) {
    let supabaseQuery = supabaseBrowser.from('products').select('*, categories(*), sub_categories(*)');

    if (categoryId) {
        supabaseQuery = supabaseQuery.eq('category_id', categoryId);
    }
    if (subCategoryId) {
        supabaseQuery = supabaseQuery.eq('sub_category_id', subCategoryId);
    }

    if (query) {
        supabaseQuery = supabaseQuery.or(`name_en.ilike.%${query}%,name_ar.ilike.%${query}%`);
    }

    const { data, error } = await supabaseQuery
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error searching products:', error);
        return [];
    }

    return (data || []) as Product[];
}
