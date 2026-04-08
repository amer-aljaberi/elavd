"use client";

import React from 'react';
import { SaudiRiyal } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number | string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

export const Price = ({ amount, className, iconClassName, showIcon = true }: PriceProps) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const formattedAmount = typeof amount === 'number' ? amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) : amount;

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      {isRTL ? (
        <>
          <span className="font-mono">{formattedAmount}</span>
          {showIcon && <SaudiRiyal className={cn("h-3.5 w-3.5", iconClassName)} />}
        </>
      ) : (
        <>
          {showIcon && <SaudiRiyal className={cn("h-3.5 w-3.5", iconClassName)} />}
          <span className="font-mono">{formattedAmount}</span>
        </>
      )}
    </div>
  );
};
