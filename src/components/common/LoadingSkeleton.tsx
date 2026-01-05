export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
    <div className="aspect-[3/4] animate-shimmer" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-muted rounded animate-shimmer" />
      <div className="h-3 w-20 bg-muted rounded animate-shimmer" />
      <div className="h-5 w-16 bg-muted rounded animate-shimmer" />
    </div>
  </div>
);

export const BannerSkeleton = () => (
  <div className="w-full h-48 rounded-2xl animate-shimmer" />
);

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 rounded-2xl animate-shimmer" />
    <div className="w-14 h-3 mt-2 rounded animate-shimmer" />
  </div>
);

export const OrderCardSkeleton = () => (
  <div className="bg-card rounded-2xl p-4 shadow-soft space-y-3">
    <div className="flex justify-between">
      <div className="h-4 w-24 bg-muted rounded animate-shimmer" />
      <div className="h-6 w-20 bg-muted rounded-full animate-shimmer" />
    </div>
    <div className="h-3 w-32 bg-muted rounded animate-shimmer" />
    <div className="flex gap-3">
      <div className="w-16 h-16 rounded-lg animate-shimmer" />
      <div className="w-16 h-16 rounded-lg animate-shimmer" />
    </div>
    <div className="h-4 w-20 bg-muted rounded animate-shimmer" />
  </div>
);
