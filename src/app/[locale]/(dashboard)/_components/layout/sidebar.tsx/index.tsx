"use client";

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
    Home,
    Users,
    Package,
    LayoutGrid,
    ShoppingCart,
    Tag,
    Ticket,
    Settings,
    ChevronRight,
    LogOut,
    Loader2
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import logo from '@/assets/dneest-logo.webp';
import { useRouter } from 'next/navigation';
import useAppStore from '@/store/store';


const nav = [
    { href: '/admin', label: { en: 'Dashboard', ar: 'لوحة التحكم' }, icon: Home },
    { href: '/admin/users', label: { en: 'Users', ar: 'المستخدمون' }, icon: Users },
    { href: '/admin/products', label: { en: 'Products', ar: 'المنتجات' }, icon: Package },
    { href: '/admin/categories', label: { en: 'Categories', ar: 'التصنيفات' }, icon: LayoutGrid },
    { href: '/admin/orders', label: { en: 'Orders', ar: 'الطلبات' }, icon: ShoppingCart },
    { href: '/admin/offers', label: { en: 'Offers', ar: 'العروض' }, icon: Tag },
];

export default function Sidebar() {
    const locale = useLocale();
    const { signOut } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const isAr = locale === 'ar';
    const logoutStore = useAppStore((state) => state.logout);
    const t = useTranslations("common");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await signOut();
            logoutStore();
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoading(false);
        }
    };

    return (
        <aside className="w-72 shrink-0 border-e border-primary/5 bg-background dark:bg-card/50 flex flex-col h-screen sticky top-0 transition-all duration-300">
            <div className="p-8 flex items-center gap-3">
                <Image src={logo} alt="Logo" width={200} height={200} />
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {nav.map((n) => {
                    const isActive = pathname === n.href || pathname === `/${locale}${n.href}`;
                    const Icon = n.icon;

                    return (
                        <Link
                            key={n.href}
                            href={n.href}
                            className={cn(
                                'flex items-center justify-between group rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 relative overflow-hidden',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                            )}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <Icon className={cn(
                                    "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                                )} />
                                <span>{n.label[isAr ? 'ar' : 'en']}</span>
                            </div>

                            {isActive && (
                                <ChevronRight className="h-4 w-4 text-primary-foreground/70 animate-in slide-in-from-left-2 duration-300 rtl:rotate-180" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6">
                <Button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    variant="outline" 
                    className="w-full hover:bg-red-500 bg-red-500/10 rounded-xl disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                        <LogOut className="h-4 w-4 mr-2" />
                    )}
                    {t("Logout")}
                </Button>
            </div>
        </aside>
    );
}
