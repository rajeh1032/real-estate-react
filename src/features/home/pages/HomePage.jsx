import { useEffect, useMemo, useState } from 'react'
import { getHomeFeaturedProperties, getHomePageContent } from '../services/homeService'
import { HeroSection } from '../components/HeroSection'
import { FeaturedSection } from '../components/FeaturedSection'
import { NewsletterSection } from '../components/NewsletterSection'

const homePageContent = getHomePageContent()

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadFeaturedProperties() {
      console.log('[HomePage] Starting to load featured properties...')
      setLoading(true)
      setError('')

      try {
        console.log('[HomePage] Calling getHomeFeaturedProperties()...')
        const properties = await getHomeFeaturedProperties()
        console.log('[HomePage] Featured properties loaded successfully:', properties)
        console.log('[HomePage] Number of featured properties:', properties.length)

        if (!ignore) {
          setFeaturedProperties(properties)
        }
      } catch (loadError) {
        console.error('[HomePage] ===== ERROR LOADING FEATURED PROPERTIES =====')
        console.error('[HomePage] Error object:', loadError)
        console.error('[HomePage] Error name:', loadError.name)
        console.error('[HomePage] Error message:', loadError.message)
        console.error('[HomePage] Error stack:', loadError.stack)
        console.error('[HomePage] ===== ERROR END =====')
        if (!ignore) {
          setError('Unable to load featured listings right now. Please try again shortly.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
          console.log('[HomePage] Loading finished')
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

  function handleSearch(query) {
    setSearchQuery(query)
  }

  return (
    <div className="pb-20">
      <HeroSection content={homePageContent.hero} onSearch={handleSearch} />
      <FeaturedSection properties={filteredProperties} loading={loading} error={error} />
      <NewsletterSection content={homePageContent.newsletter} />
    </div>
  )
}
