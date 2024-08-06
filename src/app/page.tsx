import { fetchData } from '../../lib/fetchData'

interface Category {
  id: number
  name: string
}

export default async function Home() {
  const data = await fetchData<Category[]>('/api/categories')

  if (!data) return <p>Error loading data...</p>

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <p>Categories</p>
      {data.length > 0 ? (
        <ul>
          {data.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      ) : (
        <p>No categories available.</p>
      )}
    </main>
  )
}
