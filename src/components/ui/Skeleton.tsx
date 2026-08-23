export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink-750 ${className ?? ""}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-[10px] border border-line bg-ink-800 p-4">
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="mb-4 h-8 w-32" />
      <Skeleton className="h-2 w-full" />
    </div>
  );
}

export function SkeletonRow({ cols }: { cols: number }) {
  return (
    <div className="flex h-11 items-center gap-4 border-b border-line px-4">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === 0 ? "w-32" : "w-20"}`} />
      ))}
    </div>
  );
}
