export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
  revalidate?: number // seconds to revalidate cache
}

export async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T | null> {
  const { method = 'GET', headers = {}, body, revalidate = 60 } = options

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      next: { revalidate },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}
