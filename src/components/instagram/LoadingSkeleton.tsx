import { cn } from '@/lib/utils';

export function ProfileSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        {/* Avatar Skeleton */}
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-muted shrink-0" />

        {/* Info Skeleton */}
        <div className="flex-1 w-full">
          <div className="h-7 w-40 bg-muted rounded mx-auto md:mx-0 mb-4" />
          
          <div className="flex items-center justify-center md:justify-start gap-8 my-4">
            <div className="h-5 w-20 bg-muted rounded" />
            <div className="h-5 w-24 bg-muted rounded" />
            <div className="h-5 w-20 bg-muted rounded" />
          </div>

          <div className="h-5 w-32 bg-muted rounded mx-auto md:mx-0 mb-3" />
          <div className="space-y-2 max-w-md mx-auto md:mx-0">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-3/4 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PostGridSkeleton() {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="h-4 w-24 bg-muted rounded mx-auto mb-6" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square bg-muted rounded-md animate-pulse",
            )}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
