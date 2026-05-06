import { Link } from 'react-router-dom'
import { PropertyCard } from './PropertyCard'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 10h12m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[24px] bg-card shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
          <div className="h-72 animate-pulse bg-surface sm:h-80" />
          <div className="space-y-4 p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="w-full space-y-3">
                <div className="h-6 w-2/3 animate-pulse rounded-full bg-surface" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-surface" />
              </div>
              <div className="h-6 w-24 animate-pulse rounded-full bg-surface" />
            </div>
            <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4">
              <div className="h-4 w-16 animate-pulse rounded-full bg-surface" />
              <div className="h-4 w-16 animate-pulse rounded-full bg-surface" />
              <div className="h-4 w-24 animate-pulse rounded-full bg-surface" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className="rounded-[24px] border border-danger/20 bg-danger/8 px-6 py-14 text-center">
      <h3 className="font-display text-2xl font-bold text-text">Featured listings are unavailable</h3>
      <p className="mt-3 text-sm text-text-muted">{message}</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-[24px] border border-border bg-card px-6 py-14 text-center shadow-soft">
      <h3 className="font-display text-2xl font-bold text-text">No featured listings matched</h3>
      <p className="mt-3 text-sm text-text-muted">
        Try a different city or architectural style in the hero search bar above.
      </p>
    </div>
  )
}

export function FeaturedSection({ properties, loading, error }) {
  return (
    <section className="bg-surface/85 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
              Curated Selection
            </p>
            <h2 className="font-display text-[2.25rem] font-bold tracking-[-0.04em] text-text">
              Featured Residencies
            </h2>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
          >
            View All Listings
            <ArrowIcon />
          </Link>
        </div>

        {error ? (
          <ErrorMessage message={error} />
        ) : loading ? (
          <LoadingSkeleton />
        ) : properties.length > 0 ? (
          <div className="grid gap-8 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  )
}
