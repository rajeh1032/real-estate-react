import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomeFeaturedProperties, getHomePageContent } from '../services/homeService'

const homePageContent = getHomePageContent()

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.25 4.25" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 10h12m0 0-4-4m4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="m12 20-1.4-1.2C5.7 14.5 2.5 11.6 2.5 8A4.5 4.5 0 0 1 7 3.5c1.8 0 3.3.8 4.3 2.1A5.3 5.3 0 0 1 15.6 3.5 4.5 4.5 0 0 1 20.1 8c0 3.6-3.2 6.5-8.1 10.8L12 20Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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

function PropertyCard({ property }) {
  const badgeClassName =
    property.badgeTone === 'accent'
      ? 'bg-[#f7bd48] text-[#271900]'
      : 'bg-[rgba(19,27,46,0.9)] text-white backdrop-blur-sm'

  return (
    <article className="overflow-hidden rounded-[24px] bg-card shadow-[0_18px_40px_rgba(17,24,39,0.08)]">
      <Link to={`/properties/${property.id}`} className="block">
        <div className="relative h-72 overflow-hidden sm:h-80">
          <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
          <button
            type="button"
            aria-label={`Save ${property.title}`}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-accent backdrop-blur-md transition hover:bg-white"
          >
            <HeartIcon />
          </button>
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

export function HomePage() {
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadFeaturedProperties() {
      setLoading(true)
      setError('')

      try {
        const properties = await getHomeFeaturedProperties()

        if (!ignore) {
          setFeaturedProperties(properties)
        }
      } catch (loadError) {
        if (!ignore) {
          setError('Unable to load featured listings right now. Please try again shortly.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadFeaturedProperties()

    return () => {
      ignore = true
    }
  }, [])

  const filteredProperties = useMemo(() => {
    if (!searchQuery) {
      return featuredProperties
    }

    const normalizedQuery = searchQuery.toLowerCase()

    return featuredProperties.filter((property) => property.searchText.includes(normalizedQuery))
  }, [featuredProperties, searchQuery])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setSearchQuery(searchInput.trim())
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault()
  }

  return (
    <div className="pb-20">
      <section className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] lg:gap-16">
          <div className="space-y-6">
            <div className="space-y-5">
              <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] text-text sm:text-[4.5rem]">
                <span className="block">{homePageContent.hero.title[0]}</span>
                <span className="mt-1 block text-primary">{homePageContent.hero.title[1]}</span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-text-muted">
                {homePageContent.hero.description}
              </p>
            </div>

            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-col gap-3 rounded-[24px] bg-card p-2 shadow-[0_20px_25px_-5px_rgba(11,28,48,0.05),0_8px_10px_-6px_rgba(11,28,48,0.05)] sm:flex-row"
            >
              <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-text-muted">
                <SearchIcon />
                <input
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder={homePageContent.hero.searchPlaceholder}
                  className="w-full min-w-0 border-none bg-transparent text-base text-text outline-none placeholder:text-[#c6c6cd]"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Search Listings
              </button>
            </form>
          </div>

          <div className="relative min-h-[320px] lg:min-h-[500px]">
            <div className="absolute bottom-2 left-1 h-40 w-40 -rotate-6 rounded-[24px] bg-[#f7bd48]/55" />
            <div className="absolute inset-x-4 top-0 rotate-[2deg] overflow-hidden rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:inset-x-0">
              <img
                src={homePageContent.hero.image}
                alt="Modern architectural residence"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

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
            <div className="rounded-[24px] border border-danger/20 bg-danger/8 px-6 py-14 text-center">
              <h3 className="font-display text-2xl font-bold text-text">Featured listings are unavailable</h3>
              <p className="mt-3 text-sm text-text-muted">{error}</p>
            </div>
          ) : loading ? (
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
          ) : filteredProperties.length > 0 ? (
            <div className="grid gap-8 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-border bg-card px-6 py-14 text-center shadow-soft">
              <h3 className="font-display text-2xl font-bold text-text">No featured listings matched</h3>
              <p className="mt-3 text-sm text-text-muted">
                Try a different city or architectural style in the hero search bar above.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[28px] bg-accent px-6 py-14 text-white shadow-[0_30px_70px_rgba(11,28,48,0.18)] sm:px-10 lg:px-16 lg:py-20">
            <img
              src={homePageContent.newsletter.image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[36%] object-cover opacity-20 md:block"
            />

            <div className="relative max-w-2xl space-y-6">
              <h2 className="font-display text-[2.2rem] font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02]">
                {homePageContent.newsletter.title}
              </h2>
              <p className="max-w-xl text-lg leading-7 text-white/55">
                {homePageContent.newsletter.description}
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4 pt-2 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={homePageContent.newsletter.inputPlaceholder}
                  className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-6 py-4 text-base text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
