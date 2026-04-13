import React from 'react';
import { Skeleton } from './skeleton';
import { cn } from 'front/lib/utils';

export const PawLoader = ({ className }: { className?: string }) => (
  <div className={cn('flex flex-col items-center justify-center gap-3 py-14', className)}>
    <span className="text-3xl opacity-80">🐾</span>
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: `${i * 140}ms`, animationDuration: '900ms' }}
        />
      ))}
    </div>
    <p className="text-[11px] tracking-wide text-muted-foreground">불러오는 중...</p>
  </div>
);

export const AnimalCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
    <Skeleton className="aspect-square w-full rounded-none" />
    <div className="space-y-1.5 p-2.5">
      <Skeleton className="h-2.5 w-3/5" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-1 pt-1">
        <Skeleton className="h-4 w-10 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
      </div>
    </div>
  </div>
);

export const SearchLoadingGrid = () => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <AnimalCardSkeleton key={i} />
    ))}
  </div>
);
