import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/useAuth'
import { toggleFavorite, checkIsFavorite } from '../services/favoritesService'

export function FavoriteButton({ propertyId, className = '', size = 'default' }) {
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  const sizeClasses = {
    small: 'h-8 w-8',
    default: 'h-10 w-10',
    large: 'h-12 w-12',
  }

  const iconSizeClasses = {
    small: 'h-3.5 w-3.5',
    default: 'h-4 w-4',
    large: 'h-5 w-5',
  }

  useEffect(() => {
    let ignore = false

    async function loadFavoriteStatus() {
      if (!user || !propertyId) {
        setIsChecking(false)
        return
      }

      setIsChecking(true)

      try {
        const status = await checkIsFavorite(user.uid, propertyId)
        if (!ignore) {
          setIsFavorite(status)
        }
      } catch (error) {
        console.error('[FavoriteButton] Error loading favorite status:', error)
      } finally {
        if (!ignore) {
          setIsChecking(false)
        }
      }
    }

    loadFavoriteStatus()

    return () => {
      ignore = true
    }
  }, [user, propertyId])

  async function handleToggle(event) {
    event.preventDefault()
    event.stopPropagation()

    if (!user) {
      alert('Please sign in to save favorites')
      return
    }

    if (isLoading) {
      return
    }

    setIsLoading(true)

    try {
      const result = await toggleFavorite(user.uid, propertyId)
      setIsFavorite(result.isFavorite)
    } catch (error) {
      console.error('[FavoriteButton] Error toggling favorite:', error)
      alert('Unable to update favorite. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isChecking) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex items-center justify-center rounded-full bg-card/90 border border-border/50 backdrop-blur-sm ${sizeClasses[size]} ${className}`}
        aria-label="Loading favorite status"
      >
        <svg
          viewBox="0 0 24 24"
          className={`animate-pulse text-text-muted ${iconSizeClasses[size]}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            d="m12 20-1.4-1.2C5.7 14.5 2.5 11.6 2.5 8A4.5 4.5 0 0 1 7 3.5c1.8 0 3.3.8 4.3 2.1A5.3 5.3 0 0 1 15.6 3.5 4.5 4.5 0 0 1 20.1 8c0 3.6-3.2 6.5-8.1 10.8L12 20Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 ${
        isFavorite
          ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
          : 'bg-card/90 text-primary border border-border/50 backdrop-blur-sm hover:bg-card hover:border-primary/30 hover:shadow-sm'
      } ${isLoading ? 'cursor-wait opacity-70' : ''} ${sizeClasses[size]} ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <svg
          viewBox="0 0 24 24"
          className={iconSizeClasses[size]}
          fill="currentColor"
        >
          <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08A6.04 6.04 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.53L12 21.35Z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className={iconSizeClasses[size]}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
 
        >
          <path
            d="m12 20-1.4-1.2C5.7 14.5 2.5 11.6 2.5 8A4.5 4.5 0 0 1 7 3.5c1.8 0 3.3.8 4.3 2.1A5.3 5.3 0 0 1 15.6 3.5 4.5 4.5 0 0 1 20.1 8c0 3.6-3.2 6.5-8.1 10.8L12 20Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}
