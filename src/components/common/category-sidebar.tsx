'use client'

import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Category, Product } from '@/services/home'
import Image from 'next/image'
import { Layers, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategorySidebarProps {
  categories: Category[]
  featuredProducts: Product[]
  activeSlug: string
}

export default function CategorySidebar({ categories, featuredProducts, activeSlug }: CategorySidebarProps) {
  const locale = useLocale()
  const t = useTranslations('common')
  const isRtl = locale === 'ar'
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="w-full space-y-8"> 
      <div className="bg-background border border-border rounded-md overflow-hidden shadow-sm">
        <div className="bg-primary px-6 py-4">
          <h3 className="text-primary-foreground font-bold text-lg font-cairo">
            {t('OurCategories')}
          </h3>
        </div>
        <div className="divide-y divide-border/50 max-h-[600px] overflow-y-auto custom-scrollbar">
          {categories.map((category) => {
            const name = locale === 'ar' ? category.name_ar : category.name_en
            const slug = category.slug_en || category.id
            const isActive = activeSlug === slug || activeSlug === category.slug_ar
            const hasSubs = category.sub_categories && category.sub_categories.length > 0
            const isOpen = openDropdowns[category.id] || categories.some(c => c.id === category.id && c.sub_categories?.some(sc => sc.slug_en === activeSlug || sc.slug_ar === activeSlug))

            return (
              <div key={category.id} className="flex flex-col">
                <div className={cn(
                  "flex items-center justify-between group transition-colors",
                  isActive ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-muted/30'
                )}>
                  <Link
                    href={`/store/${slug}`}
                    className="flex-1 px-6 py-4 font-medium font-cairo flex items-center justify-between"
                  >
                    <span className={cn(isActive && 'font-bold')}>
                      {name}
                    </span>
                    {hasSubs && (
                      <span className="text-[10px] py-0.5 px-2 rounded-full border border-border/40 bg-muted/20 text-muted-foreground/60 font-black group-hover:border-secondary/30 group-hover:bg-secondary/10 group-hover:text-secondary transition-all duration-300">
                        {category.sub_categories?.length}
                      </span>
                    )}
                  </Link>
                  
                  {hasSubs ? (
                    <button 
                      onClick={(e) => toggleDropdown(category.id, e)}
                      className="px-4 py-4 h-full flex items-center justify-center border-s border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <ChevronDown size={16} className={cn(
                        "transition-transform duration-300",
                        isOpen ? "rotate-180" : "rotate-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )} />
                    </button>
                  ) : (
                    <div className="px-6 py-4">
                      {isRtl ? (
                        <ChevronLeft size={16} className={isActive ? 'text-primary' : 'text-muted-foreground/30 group-hover:text-primary'} />
                      ) : (
                        <ChevronRight size={16} className={isActive ? 'text-primary' : 'text-muted-foreground/30 group-hover:text-primary'} />
                      )}
                    </div>
                  )}
                </div>

                {/* Subcategories Dropdown */}
                {hasSubs && (
                  <div className={cn(
                    "bg-muted/30 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] border-b border-border" : "max-h-0"
                  )}>
                    <div className="py-2">
                       {category.sub_categories?.map((sub) => {
                         const subName = locale === 'ar' ? sub.name_ar : sub.name_en
                         const subSlug = sub.slug_en || sub.id
                         const isSubActive = activeSlug === subSlug || activeSlug === sub.slug_ar

                         return (
                           <Link
                             key={sub.id}
                             href={`/store/${slug}/${subSlug}`}
                             className={cn(
                               "flex items-center gap-3 px-10 py-2.5 text-sm font-cairo transition-all hover:translate-x-1 rtl:hover:-translate-x-1",
                               isSubActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                             )}
                           >
                             <div className={cn(
                               "w-1.5 h-1.5 rounded-full",
                               isSubActive ? "bg-secondary scale-125 shadow-[0_0_8px_rgba(64,179,150,0.5)]" : "bg-muted-foreground/30"
                             )} />
                             {subName}
                           </Link>
                         )
                       })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
 
      <div className="bg-background border border-border rounded-md min-h-[400px] overflow-hidden shadow-sm">
        <div className="bg-primary px-6 py-4">
          <h3 className="text-primary-foreground font-bold text-lg font-cairo">
            {t('FeaturedProducts')}
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {featuredProducts.map((product) => {
            const name = locale === 'ar' ? product.name_ar : product.name_en
            const slug = product.slug_en || product.id

            return (
              <Link
                key={product.id}
                href={`/product/${slug}`}
                className="flex items-center gap-4 group"
              >
                <div className="relative size-16 bg-muted/30 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                  {product.main_image ? (
                    <Image
                      src={product.main_image}
                      alt={name || ''}
                      fill
                      className="object-contain p-2 transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <Layers size={20} className="text-muted-foreground/30 m-auto mt-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-foreground font-cairo line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {name}
                  </h4>
                  {product.price && (
                    <p className="text-primary font-bold mt-1 text-sm">
                      {product.price} {t('Currency')}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
