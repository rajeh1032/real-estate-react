import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/context/useAuth'
import { PropertyCard } from '../../properties/components/PropertyCard'
import { getAccountProfile, getAccountProperties } from '../services/accountService'

function FieldItem({ label, value }) {
  return (
    <div className="rounded-lg border border-border/80 bg-surface/60 px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-text">{value}</p>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse rounded-[28px] bg-card p-6 shadow-soft">
        <div className="h-40 rounded-2xl bg-surface" />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="h-20 rounded-lg bg-surface" />
          <div className="h-20 rounded-lg bg-surface" />
          <div className="h-20 rounded-lg bg-surface" />
          <div className="h-20 rounded-lg bg-surface" />
        </div>
      </div>
    </div>
  )
}

export function AccountPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadAccount() {
      if (!user) {
        return
      }

      try {
        setLoading(true)
        setError('')
        const [profileData, propertyData] = await Promise.all([
          getAccountProfile(user),
          getAccountProperties(user.uid),
        ])

        if (isMounted) {
          setProfile(profileData)
          setProperties(propertyData)
        }
      } catch (accountError) {
        if (isMounted) {
          setError(accountError.message || 'Unable to load your profile right now.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadAccount()

    return () => {
      isMounted = false
    }
  }, [user])

  const initials = useMemo(() => {
    const name = profile?.name || user?.email || ''
    return name
      .split(/[ @.]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('')
  }, [profile?.name, user?.email])

  if (loading) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-[24px] border border-danger/30 bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold text-danger">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-[28px] bg-card shadow-soft">
          <div className="bg-[#121d34] px-5 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="h-28 w-28 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl shadow-black/20">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold">
                      {initials || 'U'}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">Private Profile</p>
                  <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.05em] sm:text-5xl">
                    {profile.name}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
                    Your saved account details and existing property portfolio.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-left backdrop-blur">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Properties</p>
                <p className="mt-1 text-3xl font-semibold">{properties.length}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-10">
            <FieldItem label="Email" value={profile.email} />
            <FieldItem label="Phone" value={profile.phone} />
            <FieldItem label="Address" value={profile.address} />
            <FieldItem label="User ID" value={profile.id} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Portfolio</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-text">Your Properties</h2>
          </div>
          <Link to="/properties" className="text-sm font-semibold text-primary transition hover:opacity-75">
            Browse all listings
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] border border-border bg-card px-6 py-12 text-center shadow-soft">
            <p className="text-sm font-semibold text-text">No properties are linked to this profile yet.</p>
            <p className="mt-2 text-sm text-text-muted">
              Existing listings with your user ID as owner will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}