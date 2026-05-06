import { Link } from 'react-router-dom'
import { FavoriteButton } from '../../favorites'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function MetaItem({ icon, value, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-text-muted flex-shrink-0">{icon}</span>
      <span>{value}</span>
      <span>{label}</span>
    </div>
  )
}

export function PropertyCard({ property }) {
  return (
    <article className="group overflow-hidden rounded-[28px] bg-card shadow-soft transition hover:-translate-y-1">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative aspect-[0.88] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute right-4 top-4">
            <FavoriteButton propertyId={property.id} />
          </div>

          {property.isFeatured ? (
            <span className="absolute bottom-4 left-4 rounded-md bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-foreground">
              Exclusive
            </span>
          ) : null}
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[1.75rem] font-semibold tracking-tight text-text">
                {property.title}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s6-4.6 6-10a6 6 0 1 0-12 0c0 5.4 6 10 6 10Z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="11" r="2.3" />
                </svg>
                {property.location}, {property.city}
              </p>
            </div>

            <p className="shrink-0 text-2xl font-semibold text-primary">
              {formatPrice(property.price)}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            <MetaItem value={property.bedrooms} label="Beds" icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h18M3 10v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8M3 10V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4m-6 5v2m-4 0v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            } />
            <MetaItem value={property.bathrooms} label="Baths" icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6h6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-10 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-3 12a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            } />
            <MetaItem value={property.area.toLocaleString('en-US')} label="SQFT" icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 12h18M12 3v18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            } />
          </div>
        </div>
      </Link>
    </article>
  )
}
