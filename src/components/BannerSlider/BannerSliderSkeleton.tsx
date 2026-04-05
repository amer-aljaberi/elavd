// Enhanced BannerSliderSkeleton.tsx
'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';

interface props {
  height: number;
}
const BannerSliderSkeleton: React.FC<props> = ({ height }) => {
  return (
    <div className="embla">
      <div className="embla__viewport">
        <div className="embla__container">
          <div className="embla__slide">
            <div
              className={`embla__slide__img h-[${height}px] w-[100%] animate-pulse rounded-lg bg-gray-200 object-cover`}
            >
              <div className="absolute inset-0 p-4">
                <div className="h-6 w-1/2 animate-pulse rounded bg-gray-300" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSliderSkeleton;
