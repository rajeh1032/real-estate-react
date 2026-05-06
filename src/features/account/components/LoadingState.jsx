export function LoadingState() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
          <div className="h-40 w-40 animate-pulse rounded-lg bg-surface" />
          <div className="flex-1 space-y-4">
            <div className="h-10 max-w-md animate-pulse rounded-full bg-surface" />
            <div className="h-4 max-w-xs animate-pulse rounded-full bg-surface" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-20 animate-pulse rounded-lg bg-surface" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
