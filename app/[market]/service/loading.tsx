export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mb-4 h-10 w-full animate-pulse rounded bg-muted md:w-96" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="aspect-video w-full animate-pulse rounded bg-muted" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-4 h-8 w-full animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
