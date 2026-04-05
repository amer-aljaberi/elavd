'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <section className="bg-slate-50 py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex-1 bg-white rounded-2xl overflow-hidden relative group shadow-sm border border-slate-100 cursor-pointer min-h-[200px] hover:border-primary/30 transition-all">
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/hotel-safe.png"
                  alt="Hotel Safes"
                  fill
                  className="object-contain p-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-6 px-6">
                <span className="bg-accent text-white text-[12px] font-black uppercase tracking-widest px-5 py-3 rounded-lg inline-flex items-center gap-3 group-hover:bg-primary transition-all duration-300 shadow-xl">
                  {t('HotelSafes')}
                  <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                </span>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl overflow-hidden relative group shadow-sm border border-slate-100 cursor-pointer min-h-[200px] hover:border-primary/30 transition-all">
              <div className="relative h-full w-full">
                <Image
                  src="/images/hero/deposit-safe.png"
                  alt="Deposit Safes"
                  fill
                  className="object-contain p-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-6 px-6">
                <span className="bg-accent text-white text-[12px] font-black uppercase tracking-widest px-5 py-3 rounded-lg inline-flex items-center gap-3 group-hover:bg-primary transition-all duration-300 shadow-xl">
                  {t('DepositSafes')}
                  <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
                </span>
              </div>
            </div>
          </div>

           <div className="lg:col-span-6 bg-white rounded-2xl p-10 shadow-sm border border-slate-100 flex flex-col justify-center order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[12px] font-black tracking-widest">
                {t('Tag')}
              </span>
            </div>
            <h1 className="text-[40px] md:text-[52px] leading-tight font-black text-foreground mb-6 tracking-tight">
              Evolis Primacy 2
            </h1>
            <p className="text-slate-600 text-[15px] md:text-[16px] leading-8 max-w-2xl mb-8">
                 يوفّر Primacy 2 خيار الطباعة على جهة واحدة أو جهتين. الخيار المثالي لطباعة وترميز البطاقات بسرعة تصل إلى 280 بطاقة في الساعة، بأمان عالٍ مع ضمان لمدة 3 سنوات، ووحدة تغليف بطاقات مزدوجة الجوانب (CLM) كخيار إضافي.
            </p>
            <div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-none group px-8 py-6 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5">
                <span className="font-bold">{t('MoreDetails')}</span>
                {isRtl ? (
                  <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-10">
              <span className="w-6 h-2 rounded-full bg-primary" />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="w-2 h-2 rounded-full bg-slate-300" />
            </div>
          </div>

           <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-center min-h-[320px] order-3">
            <div className="relative w-full aspect-square">
              <Image
                src="/images/hero/printer.png"
                alt="Evolis Primacy 2"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}