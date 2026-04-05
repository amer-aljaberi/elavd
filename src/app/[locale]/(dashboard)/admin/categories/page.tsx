import React from 'react';
import CategoryList from './_components/CategoryList';
import { useTranslations } from 'next-intl';

export default function CategoriesPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-6 pb-20">
      <CategoryList />
    </div>
  );
}

