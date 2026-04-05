'use client'

import React from 'react'
import { ShoppingCart, Heart, Repeat } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function HeaderActions() {
  const t = useTranslations('common')

  return (
    <div className="flex items-center gap-2">
      <div className="hidden sm:flex items-center gap-4 text-xs font-medium mr-4">
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <div className="p-2.5 rounded-full bg-slate-50 group-hover:bg-primary/10 transition">
            <Heart className="w-5 h-5 text-foreground group-hover:text-primary" />
          </div>
          <span>{t('Wishlist')}</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
          <div className="p-2.5 rounded-full bg-slate-50 group-hover:bg-primary/10 transition">
            <Repeat className="w-5 h-5 text-foreground group-hover:text-primary" />
          </div>
          <span>{t('Compare')}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pl-4 border-l border-border group cursor-pointer">
        <div className="bg-primary p-3 rounded-lg text-white shadow-md shadow-primary/20 group-hover:shadow-lg transition-all group-hover:-translate-y-0.5">
          <ShoppingCart className="w-6 h-6" />
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-xs text-muted-foreground">{t('Items')}</span>
          <span className="text-sm font-bold">{t('Total')} : 0</span>
        </div>
      </div>
    </div>
  )
}

