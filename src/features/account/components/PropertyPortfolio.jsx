import { Link } from 'react-router-dom'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function PropertyCard({ property }) {
  return (
    <Link
      to={`/properties/${property.id}`}
      className="group grid overflow-hidden rounded-lg border border-border bg-card shadow-soft transition hover:-translate-y-1 hover:border-primary/40 sm:grid-cols-[180px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-auto sm:min-h-56">
        {property.image ? (
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
            No Image
          </div>
        )}
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A6.04 6.04 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35Z" />
          </svg>
        </span>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 p-5">
        <div className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-semibold tracking-tight text-text">
                {property.title}
              </h2>
              <p className="mt-1 text-sm text-text-muted">{property.location}</p>
            </div>
            <p className="text-lg font-semibold text-primary sm:text-right">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          <div className="rounded-lg bg-surface px-2 py-3">
            <span className="block text-base text-text">{property.area.toLocaleString('en-US')}</span>
            Area
          </div>
          <div className="rounded-lg bg-surface px-2 py-3">
            <span className="block text-base text-text">{property.bedrooms}</span>
            Beds
          </div>
          <div className="rounded-lg bg-surface px-2 py-3">
            <span className="block text-base text-text">{property.bathrooms}</span>
            Baths
          </div>
        </div>
      </div>
    </Link>
  )
}

export function PropertyPortfolio({ properties }) {
  const propertyCountLabel = properties.length === 1 ? '1 property' : `${properties.length} properties`

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Saved Portfolio
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            Properties connected to your account
          </h2>
        </div>
        <p className="text-sm font-medium text-text-muted">{propertyCountLabel}</p>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-lg border border-border bg-card px-6 py-12 text-center shadow-soft">
          <p className="text-xl font-semibold text-text">No related properties found</p>
          <p className="mt-2 text-sm text-text-muted">
            Existing owned properties or saved favorites will appear here when they reference your user ID.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}
