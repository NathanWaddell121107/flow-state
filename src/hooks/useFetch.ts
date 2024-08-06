import { useEffect, useState } from 'react'

type UseFetchResult<T> = {
  data: T | null
  error: Error | null
  loading: boolean
}

export default function useFetch<T>(endpoint: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Determine the base URL based on environment
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
        const url = `${baseUrl}${endpoint}`

        // Fetch data from the API
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, error, loading }
}
