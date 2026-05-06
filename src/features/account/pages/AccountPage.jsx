
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/context/useAuth'
import { getAccountProfile, getUserProperties } from '../services/accountService'

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function getInitials(name, email) {
  const source = name || email || 'Member'
  const parts = source.trim().split(/\s+/).slice(0, 2)
  return parts.map((part) => part.charAt(0).toUpperCase()).join('')
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/80 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-text-muted">
        {label}
      </p>
      <p className="mt-1 min-h-6 text-sm font-semibold text-text">
        {value || 'Not provided'}
      </p>
    </div>
  )
}

function LoadingBlock() {
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

function ProfileAvatar({ profile }) {
  const initials = getInitials(profile.name, profile.email)

  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt={profile.name}
        className="h-40 w-40 rounded-lg object-cover shadow-soft ring-1 ring-border sm:h-48 sm:w-48"
      />
    )
  }

  return (
    <div className="flex h-40 w-40 items-center justify-center rounded-lg bg-accent text-5xl font-semibold text-white shadow-soft ring-1 ring-border sm:h-48 sm:w-48">
      {initials}
    </div>
  )
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

export function AccountPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadAccount() {
      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const accountProfile = await getAccountProfile(user)
        const accountProperties = await getUserProperties(accountProfile)

        if (!ignore) {
          setProfile(accountProfile)
          setProperties(accountProperties)
        }
      } catch (loadError) {
        if (!ignore) {
          setError('Unable to load your profile right now. Please refresh and try again.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadAccount()

    return () => {
      ignore = true
    }
  }, [user])

  const propertyCountLabel = useMemo(() => {
    if (properties.length === 1) {
      return '1 property'
    }

    return `${properties.length} properties`
  }, [properties.length])

  if (loading) {
    return <LoadingBlock />
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Private Profile
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text">
          Sign in to view your DreamHome profile.
        </h1>
        <p className="mt-4 text-text-muted">
          This page only reads data for the currently authenticated Firebase user.
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-6 py-8 text-danger">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-soft">
        <div className="absolute inset-x-0 top-0 h-36 bg-accent" />
        <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end">
            <ProfileAvatar profile={profile} />

            <div className="min-w-0 flex-1 pb-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-foreground/80 lg:text-text-muted">
                Verified Profile
              </p>
              <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <h1 className="break-words text-4xl font-semibold tracking-tight text-white lg:text-6xl lg:text-text">
                    {profile.name}
                  </h1>
                  <p className="mt-2 text-sm font-medium text-white/75 lg:text-text-muted">
                    {profile.email}
                  </p>
                </div>
                <div className="inline-flex w-fit rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  {propertyCountLabel}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem label="Name" value={profile.name} />
            <InfoItem label="Email" value={profile.email} />
            <InfoItem label="Phone" value={profile.phone} />
            <InfoItem label="Address" value={profile.address} />
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
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
        <div className="mt-8 rounded-lg border border-border bg-card px-6 py-12 text-center shadow-soft">
          <p className="text-xl font-semibold text-text">No related properties found</p>
          <p className="mt-2 text-sm text-text-muted">
            Existing owned properties or saved favorites will appear here when they reference your user ID.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  )
}
