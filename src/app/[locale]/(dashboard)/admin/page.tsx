"use client";

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { StatsCard, DashboardCard } from '@/app/[locale]/(dashboard)/_components/common/Card';
import { DashboardTable, DashboardTableRow, DashboardTableCell } from '@/app/[locale]/(dashboard)/_components/common/Table';
import { supabaseBrowser } from '@/lib/supabase/client';
import { Package, ShoppingCart, Users, DollarSign, Calendar, User as UserIcon } from 'lucide-react';

export default function AdminDashboardPage() {
    const t = useTranslations('dashboard');
    const locale = useLocale();
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
        revenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [{ count: productsCount }, { count: ordersCount }, { count: usersCount }] = await Promise.all([
                    supabaseBrowser.from('products').select('*', { count: 'exact', head: true }),
                    supabaseBrowser.from('orders').select('*', { count: 'exact', head: true }),
                    supabaseBrowser.from('profiles').select('*', { count: 'exact', head: true }),
                ]);

                const { data: revenueAgg } = await supabaseBrowser
                    .from('orders')
                    .select('total_amount')
                    .order('created_at', { ascending: false })
                    .limit(100);

                const revenue = (revenueAgg || []).reduce((sum: number, o: any) => sum + (o.total_amount || 0), 0);

                const { data: latest } = await supabaseBrowser
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setStats({
                    products: productsCount || 0,
                    orders: ordersCount || 0,
                    users: usersCount || 0,
                    revenue,
                });
                setRecentOrders(latest || []);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black  text-foreground ">{t('Dashboard')}</h1>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {t('WelcomeBack') || 'Monitor store performance and recent activity at a glance.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatsCard title={t('TotalProducts') || 'Total Products'} value={loading ? '—' : stats.products} icon={Package} />
                <StatsCard title={t('TotalOrders') || 'Total Orders'} value={loading ? '—' : stats.orders} icon={ShoppingCart} />
                <StatsCard title={t('TotalUsers') || 'Total Users'} value={loading ? '—' : stats.users} icon={Users} />
                <StatsCard title={t('RecentRevenue') || 'Recent Revenue'} value={loading ? '—' : `$${stats.revenue.toFixed(2)}`} icon={DollarSign} />
            </div>

            <DashboardCard title={t('RecentOrders') || 'Recent Orders'} subtitle={t('LatestFiveOrders') || 'Latest five orders'}>
                <DashboardTable headers={[t('OrderID') || 'Order ID', t('Customer') || 'Customer', t('Total') || 'Total', t('CreatedAt') || 'Created at']}>
                    {recentOrders.map((order) => (
                        <DashboardTableRow key={order.id}>
                            <DashboardTableCell>
                                <span className="text-[10px] uppercase font-medium text-muted-foreground bg-foreground/[0.05] px-2 py-0.5 rounded-full border border-border/60">
                                    #{order.id?.slice(0, 8)}
                                </span>
                            </DashboardTableCell>
                            <DashboardTableCell>
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-foreground/[0.06] flex items-center justify-center text-muted-foreground">
                                        <UserIcon className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-sm">Customer #{order.user_id?.slice(0, 4) || '—'}</span>
                                </div>
                            </DashboardTableCell>
                            <DashboardTableCell>
                                <span className="font-semibold font-mono">${(order.total_amount || 0).toFixed(2)}</span>
                            </DashboardTableCell>
                            <DashboardTableCell>
                                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                    <Calendar className="h-3 w-3 opacity-50" />
                                    {order.created_at ? new Date(order.created_at).toLocaleDateString(locale) : '—'}
                                </span>
                            </DashboardTableCell>
                        </DashboardTableRow>
                    ))}
                    {recentOrders.length === 0 && !loading && (
                        <DashboardTableRow className="text-center">
                            <DashboardTableCell className="col-span-4 text-center">
                                <span className="text-sm text-muted-foreground">{t('NoData') || 'No recent orders found.'}</span>
                            </DashboardTableCell>
                        </DashboardTableRow>
                    )}
                </DashboardTable>
            </DashboardCard>
        </div>
    );
}
