import axios from 'axios'

// mockApi demonstrates axios patterns and localStorage fallback.
const KEY = 'food_saver_items'
const BASE = 'http://localhost:4000'

async function fallbackGet() {
  const raw = localStorage.getItem(KEY) || '[]'
  return JSON.parse(raw)
}

async function fallbackSave(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
  return items
}

export async function fetchItems() {
  try {
    const res = await axios.get(`${BASE}/items`)
    return res.data
  } catch (err) {
    return fallbackGet()
  }
}

export async function createItem(item) {
  try {
    const res = await axios.post(`${BASE}/items`, item)
    return res.data
  } catch (err) {
    const items = await fallbackGet()
    const it = { ...item, id: Date.now() }
    items.push(it)
    await fallbackSave(items)
    return it
  }
}

export async function updateItem(id, patch) {
  try {
    const res = await axios.patch(`${BASE}/items/${id}`, patch)
    return res.data
  } catch (err) {
    const items = await fallbackGet()
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) throw new Error('Not found')
    items[idx] = { ...items[idx], ...patch }
    await fallbackSave(items)
    return items[idx]
  }
}

export async function deleteItem(id) {
  try {
    await axios.delete(`${BASE}/items/${id}`)
    return true
  } catch (err) {
    const items = await fallbackGet()
    const rest = items.filter(i => i.id !== id)
    await fallbackSave(rest)
    return true
  }
}
