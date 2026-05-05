import { useEffect, useMemo, useState } from 'react'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyFilters } from '../components/PropertyFilters'
import { PropertiesPagination } from '../components/PropertiesPagination'
import { getProperties } from '../services/propertiesService'

const ITEMS_PER_PAGE = 4
const CATEGORY_OPTIONS = ['All', 'Budget', 'Standard', 'Premium', 'Luxury']

function formatPriceLabel(value) {
  if (!value) {
    return 'Any budget'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [filters, setFilters] = useState({
    city: '',
    type: 'All',
    minPrice: 0,
  })
  const [appliedFilters, setAppliedFilters] = useState({
    city: '',
    type: 'All',
    minPrice: 0,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadProperties() {
      setLoading(true)
      setError('')

      try {
        const data = await getProperties()

        if (!ignore) {
          setProperties(data)
        }
      } catch (loadError) {
        if (!ignore) {
          setError('Unable to load properties right now. Please try again shortly.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadProperties()

    return () => {
      ignore = true
    }
  }, [])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const cityMatch =
        !appliedFilters.city ||
        property.city.toLowerCase().includes(appliedFilters.city.toLowerCase()) ||
        property.location.toLowerCase().includes(appliedFilters.city.toLowerCase())

      const typeMatch =
        appliedFilters.type === 'All' ||
        property.type.toLowerCase() === appliedFilters.type.toLowerCase()

      const priceMatch =
        !appliedFilters.minPrice || property.price >= appliedFilters.minPrice

      const categoryMatch =
        activeCategory === 'All' ||
        (property.category || '').toLowerCase() === activeCategory.toLowerCase()

      return cityMatch && typeMatch && priceMatch && categoryMatch
    })
  }, [activeCategory, appliedFilters, properties])

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE))

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [currentPage, filteredProperties])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, appliedFilters])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Curated Portfolio
        </p>
        <div className="max-w-3xl space-y-5">
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl">
            Architectural Excellence
          </h1>
          <div className="h-1 w-20 rounded-full bg-amber-400" />
        </div>
      </div>

      <div className="mt-10 grid gap-16 xl:grid-cols-[300px_minmax(0,1fr)]">
        <PropertyFilters
          filters={filters}
          onChange={setFilters}
          onApply={() => setAppliedFilters(filters)}
        />

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-muted">
              {loading ? 'Loading properties...' : `Showing ${filteredProperties.length} properties`}
            </p>

            <div className="flex flex-wrap gap-3">
              {CATEGORY_OPTIONS.map((category) => {
                const isActive = activeCategory === category

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={
                      isActive
                        ? 'rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground'
                        : 'rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-text-muted transition hover:text-text'
                    }
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {error ? (
            <div className="rounded-[28px] border border-danger/30 bg-danger/10 px-6 py-8 text-sm text-danger">
              {error}
            </div>
          ) : null}

          {!error && !loading && filteredProperties.length === 0 ? (
            <div className="rounded-[28px] border border-border bg-card px-6 py-12 text-center shadow-soft">
              <p className="text-xl font-semibold text-text">No properties matched your filters</p>
              <p className="mt-2 text-sm text-text-muted">
                Try another city, property type, or lower your minimum budget from{' '}
                {formatPriceLabel(appliedFilters.minPrice)}.
              </p>
            </div>
          ) : null}

          <div className="grid gap-8 md:grid-cols-2">
            {loading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[28px] border border-border bg-card shadow-soft"
                  >
                    <div className="aspect-[0.88] animate-pulse bg-surface" />
                    <div className="space-y-4 p-5">
                      <div className="h-6 w-2/3 animate-pulse rounded-full bg-surface" />
                      <div className="h-4 w-1/2 animate-pulse rounded-full bg-surface" />
                      <div className="h-4 w-5/6 animate-pulse rounded-full bg-surface" />
                    </div>
                  </div>
                ))
              : paginatedProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
          </div>

          {!loading && filteredProperties.length > 0 ? (
            <PropertiesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
