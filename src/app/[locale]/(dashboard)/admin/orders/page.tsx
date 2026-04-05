import React from 'react';
import OrderList from './_components/OrderList';
import { useTranslations } from 'next-intl';

export default function OrdersPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6 pb-20">
 

      <OrderList />
    </div>
  );
}

