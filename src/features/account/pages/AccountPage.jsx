import { useEffect, useState } from 'react'
import { useAuth } from '../../auth/context/useAuth'
import { getAccountProfile, getUserProperties } from '../services/accountService'
import {
  LoadingState,
  UnauthenticatedState,
  ErrorState,
  ProfileHeader,
  PropertyPortfolio,
} from '../components'

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

  if (loading) {
    return <LoadingState />
  }

  if (!user) {
    return <UnauthenticatedState />
  }

  if (error) {
    return <ErrorState message={error} />
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ProfileHeader profile={profile} propertyCount={properties.length} />
      <div className="mt-12">
        <PropertyPortfolio properties={properties} />
      </div>
    </section>
  )
}
