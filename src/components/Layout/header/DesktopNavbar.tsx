'use client'

import React from 'react'
import { Link } from '@/i18n/routing'
import { Phone } from 'lucide-react'
import { useLocale } from 'next-intl'
import type { Category } from '@/services/categoryService'

interface NavLink {
  href: string
  label: string
}

interface DesktopNavbarProps {
  navLinks: NavLink[]
  categories: Category[]
}

export default function DesktopNavbar({ navLinks, categories }: DesktopNavbarProps) {
  const locale = useLocale()

  return (
    <div className="bg-white px-4 shadow-xl border-t border-white/5 h-[50px] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <div className="flex items-center overflow-x-auto no-scrollbar scroll-smooth">
          <nav className="flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-[13px] font-bold text-[#1a1a1a] hover:text-primary transition-all rounded-md whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/product-category/${cat.slug_en}`}
                className="px-4 py-3 text-[13px] font-bold text-[#1a1a1a] hover:text-primary transition-all rounded-md whitespace-nowrap"
              >
                {locale === 'ar' ? cat.name_ar : cat.name_en}
              </Link>
            ))}
          </nav>
        </div>

        {/* Phone: lg+ only */}
        <div className="hidden lg:flex items-center gap-3 text-[#1a1a1a] font-bold group cursor-pointer shrink-0 ps-4">
          <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors">
            <Phone className="w-4 h-4 text-primary group-hover:text-white" />
          </div>
          <span className="text-[14px] tracking-tight">00966551628281</span>
        </div>
      </div>
    </div>
  )
}
