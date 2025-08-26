export async function fetchGuidance(mood) {
  const res = await fetch('/api/get_verse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mood })
  })
  if (!res.ok) {
    throw new Error('Request failed')
  }
  return res.json()
}