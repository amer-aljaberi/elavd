"use client";

import React, { useEffect, useState } from "react";
import {
    DashboardTable,
    DashboardTableRow,
    DashboardTableCell
} from "@/app/[locale]/(dashboard)/_components/common/Table";
import {
    DashboardSearch,
    DashboardSelectFilter,
    DashboardPagination
} from "@/app/[locale]/(dashboard)/_components/common/Filters";
import {
    DashboardModal
} from "@/app/[locale]/(dashboard)/_components/common/Modal";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";
import { supabaseBrowser } from "@/lib/supabase/client";
import { Edit2, Trash2, Plus, Star, Package, RefreshCw, Eye } from "lucide-react";
import ProductForm from "./ProductForm";
import DeleteProduct from "./DeleteProduct";
import { toast } from "sonner";

export default function ProductList() {
    const t = useTranslations("dashboard");
    const locale = useLocale();
    const isAr = locale === "ar";

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        let query = supabaseBrowser
            .from('products')
            .select(`
                *,
                categories(name_en, name_ar)
            `, { count: 'exact' });

        if (search) {
            query = query.or(`name_en.ilike.%${search}%,name_ar.ilike.%${search}%`);
        }

        // Apply status filter
        if (statusFilter === "active") {
            query = query.eq('is_active', true);
        } else if (statusFilter === "inactive") {
            query = query.eq('is_active', false);
        } else if (statusFilter === "featured") {
            query = query.eq('is_featured', true);
        }

        const pageSize = 10;
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await query
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products");
        } else {
            setProducts(data || []);
            if (count) {
                setTotalPages(Math.ceil(count / pageSize));
                setTotalCount(count);
            } else {
                setTotalCount(data?.length || 0);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search, statusFilter]);

    const handleEdit = (product: any) => {
        setSelectedProduct(product);
        setIsEditOpen(true);
    };

    const handleDelete = (product: any) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const handleSuccess = () => {
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        fetchProducts();
        toast.success("Done!");
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">
                    <DashboardSearch
                        placeholder={t("SearchProducts")}
                        onChange={(val) => { setSearch(val); setPage(1); }}
                        className="w-full md:w-[28rem]"
                    />

                    <div className="flex flex-wrap items-center gap-2 md:gap-3 justify-between md:justify-end w-full md:w-auto">
                        <DashboardSelectFilter
                            value={statusFilter}
                            onChange={(val) => { setStatusFilter(val); setPage(1); }}
                            options={[
                                { label: t("All") || "All", value: "all" },
                                { label: t("Active") || "Active", value: "active" },
                                { label: t("Inactive") || "Inactive", value: "inactive" },
                                { label: t("Featured") || "Featured", value: "featured" },
                            ]}
                            placeholder={t("Filter") || "Filter"}
                        />
                        <Button variant="outline" size="icon" onClick={fetchProducts} className="h-8 w-8 md:h-9 md:w-9 rounded-full border-border/60 hover:border-foreground/30">
                            <RefreshCw className={loading ? "animate-spin" : ""} />
                        </Button>
                        <Button onClick={() => { setSelectedProduct(null); setIsEditOpen(true); }} className="font-semibold rounded-full px-4 md:px-6 gap-2 shadow-sm border border-border/60 bg-foreground text-background hover:bg-foreground/90">
                            <Plus className="h-5 w-5 stroke-[3]" />
                            {t("AddProduct")}
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                        {totalCount} {t("Results") || "results"}
                    </span>
                </div>
            </div>

            <DashboardTable headers={[
                t("Images"),
                t("NameEn"),
                t("Category"),
                t("Price"),
                t("Status"),
                t("Actions")
            ]}>
                {products.map((product) => (
                    <DashboardTableRow key={product.id}>
                        <DashboardTableCell>
                            <div className="h-14 w-14 rounded-xl overflow-hidden border border-border/60 bg-background/60 p-1 group">
                                {product.main_image ? (
                                    <img src={product.main_image} alt="" className="h-full w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-muted-foreground/60">
                                        <Package className="h-6 w-6 opacity-30" />
                                    </div>
                                )}
                            </div>
                        </DashboardTableCell>
                        <DashboardTableCell>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold tracking-tight">{isAr ? product.name_ar : product.name_en}</span>
                                <span className="text-[10px] uppercase font-medium text-muted-foreground bg-foreground/[0.05] px-2 py-0.5 rounded-full self-start border border-border/60">
                                    {product.slug_en}
                                </span>
                            </div>
                        </DashboardTableCell>
                        <DashboardTableCell>
                            <span className="text-xs font-semibold px-3 py-1 bg-background/60 border border-border/60 rounded-full text-foreground/80">
                                {isAr ? product.categories?.name_ar : product.categories?.name_en || "-"}
                            </span>
                        </DashboardTableCell>
                        <DashboardTableCell>
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground">${product.price}</span>
                                {product.discount_price > 0 && <span className="text-[11px] text-muted-foreground line-through decoration-2">${product.discount_price}</span>}
                            </div>
                        </DashboardTableCell>
                        <DashboardTableCell>
                            <div className="flex items-center gap-3">
                                <div className={`h-2.5 w-2.5 rounded-full ${product.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                {product.is_featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                            </div>
                        </DashboardTableCell>
                        <DashboardTableCell>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(product)} className="h-9 w-9 rounded-full hover:bg-foreground/[0.06] hover:text-foreground transition-all">
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(product)} className="h-9 w-9 rounded-full hover:bg-rose-500/10 hover:text-rose-600 transition-all">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </DashboardTableCell>
                    </DashboardTableRow>
                ))}
            </DashboardTable>

            <DashboardPagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage(p => Math.max(1, p - 1))}
                onNext={() => setPage(p => Math.min(totalPages, p + 1))}
            />

            {/* Edit/Create Modal */}
            <DashboardModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={selectedProduct ? t("EditProduct") : t("AddProduct")}
                description={selectedProduct ? (isAr ? selectedProduct.name_ar : selectedProduct.name_en) : "Fill the form to add a new product."}
                footer={
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditOpen(false)}
                        >
                            {t("Cancel")}
                        </Button>
                        <Button
                            type="submit"
                            form="product-form"
                        >
                            {t("Save")}
                        </Button>
                    </div>
                }
            >
                <ProductForm
                    initialData={selectedProduct}
                    onSuccess={handleSuccess}
                    onCancel={() => setIsEditOpen(false)}
                    formId="product-form"
                />
            </DashboardModal>

            {/* Delete Modal */}
            <DeleteProduct
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onSuccess={handleSuccess}
                product={selectedProduct}
            />
        </div>
    );
}