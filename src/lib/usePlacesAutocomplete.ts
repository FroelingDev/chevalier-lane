/// <reference types="@types/google.maps" />

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    google: any
  }
}

interface UsePlacesAutocompleteOptions {
  onPlaceSelect?: (place: google.maps.places.PlaceResult) => void
  types?: string[]
  componentRestrictions?: { country: string | string[] }
}

export function usePlacesAutocomplete(options: UsePlacesAutocompleteOptions = {}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const calculateRouteDuration = async (origin: string, destination: string): Promise<number | null> => {
    return new Promise((resolve) => {
      if (!window.google?.maps?.DirectionsService) {
        console.warn('Google Maps DirectionsService not available')
        resolve(null)
        return
      }

      const directionsService = new window.google.maps.DirectionsService()

      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          drivingOptions: {
            departureTime: new Date(Date.now() + 60000), // 1 minute from now
          },
        },
        (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            const route = result.routes[0]
            if (route && route.legs.length > 0) {
              const duration = route.legs[0].duration
              if (duration) {
                // Convert to minutes and add 60 minutes for chauffeur preparation/service time
                const totalMinutes = Math.ceil(duration.value / 60) + 60
                resolve(totalMinutes)
                return
              }
            }
          }
          console.warn('Could not calculate route duration:', status)
          resolve(null)
        }
      )
    })
  }

  useEffect(() => {
    // Check if Google Maps API is loaded
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsLoaded(true)
        return true
      }
      return false
    }

    // If already loaded, initialize immediately
    if (checkGoogleMaps()) {
      initializeAutocomplete()
      return
    }

    // Otherwise, wait for it to load
    const interval = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(interval)
        initializeAutocomplete()
      }
    }, 100)

    // Cleanup
    return () => {
      clearInterval(interval)
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [])

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google?.maps?.places) return

    const autocompleteOptions: google.maps.places.AutocompleteOptions = {
      fields: ['formatted_address', 'geometry', 'name', 'place_id'],
      ...options,
    }

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      autocompleteOptions
    )

    // Add listener for place selection
    if (autocompleteRef.current) {
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace()
        if (place && options.onPlaceSelect) {
          options.onPlaceSelect(place)
        }
      })
    }
  }

  const resetAutocomplete = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return {
    inputRef,
    isLoaded,
    resetAutocomplete,
    calculateRouteDuration,
  }
}
