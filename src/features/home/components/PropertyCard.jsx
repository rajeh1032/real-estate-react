import { Link } from 'react-router-dom'
import { FavoriteButton } from '../../favorites'

function MetricIcon({ icon }) {
  if (icon === 'bed') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 11.5h18M5.5 11.5V8.8A1.8 1.8 0 0 1 7.3 7h3.9A1.8 1.8 0 0 1 13 8.8v2.7M3 17v-5.5A1.5 1.5 0 0 1 4.5 10h15a1.5 1.5 0 0 1 1.5 1.5V17M5 17v2M19 17v2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 9h3.6A2.4 2.4 0 0 1 19 11.4V17" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (icon === 'bath') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 13.5h16M6 16.5h12M7 16.5v1.8M17 16.5v1.8M7 13.5V8.7A2.7 2.7 0 0 1 9.7 6H12a2 2 0 0 1 2 2v.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 8.8a1.9 1.9 0 1 1 3.8 0v4.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M4 8.5 12 4l8 4.5M4 15.5 12 11l8 4.5M4 8.5v7l8 4.5 8-4.5v-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PropertyCard({ property }) {
  const badgeClassName =
    property.badgeTone === 'accent'
      ? 'bg-[#f7bd48] text-[#271900]'
      : 'bg-[rgba(19,27,46,0.9)] text-white backdrop-blur-sm'

  return (
    <article className="overflow-hidden rounded-[24px] bg-card shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative h-72 overflow-hidden sm:h-80">
          <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
          <div className="absolute right-4 top-4">
            <FavoriteButton propertyId={property.id} className="!bg-white/80 !text-accent hover:!bg-white" />
          </div>
          {property.badge ? (
            <span className={`absolute bottom-4 left-4 rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${badgeClassName}`}>
              {property.badge}
            </span>
          ) : null}
        </div>

        <div className="space-y-4 p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-[1.35rem] font-bold text-text">{property.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{property.location}</p>
            </div>
            <p className="text-base font-semibold text-text sm:text-lg">{property.price}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border/60 pt-4 text-[12px] font-medium text-text-muted">
            {property.stats.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <MetricIcon icon={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
