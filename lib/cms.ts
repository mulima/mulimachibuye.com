// ...existing code...
export async function getPosts(): Promise<any[]> {
  const cms = process.env.CMS_URL
  if (!cms) return []
  const url = cms.replace(/\/$/, "") + "/posts"
  const res = await fetch(url)
  if (!res.ok) return []
  return res.json()
}

export async function getPost(slug: string): Promise<any | null> {
  const cms = process.env.CMS_URL
  if (!cms) return null
  const url = cms.replace(/\/$/, "") + `/posts/${encodeURIComponent(slug)}`
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 404) return null
    return null
  }
  return res.json()
}
// ...existing code...