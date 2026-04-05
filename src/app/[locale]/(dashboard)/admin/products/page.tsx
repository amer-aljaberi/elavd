import React from 'react';
import ProductList from './_components/ProductList';
import { useTranslations } from 'next-intl';

export default function ProductsPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6 pb-20">
 

      <ProductList />
    </div>
  );
}

