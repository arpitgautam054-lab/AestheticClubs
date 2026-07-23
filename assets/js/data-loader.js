import { CONFIG } from './config.js';

let cachedLooks = null;

export async function fetchLooks() {
  if (cachedLooks) return cachedLooks;
  try {
    const response = await fetch('assets/data/looks.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    cachedLooks = await response.json();
    return cachedLooks;
  } catch (error) {
    console.error("Failed to load looks database.", error);
    return [];
  }
}

export async function getLookById(id) {
  const looks = await fetchLooks();
  return looks.find(look => look.id === id) || null;
}

export async function getLooksByAesthetic(aesthetic) {
  const looks = await fetchLooks();
  if (!aesthetic || aesthetic.toLowerCase() === 'all') return looks;
  return looks.filter(look => look.aesthetic.toLowerCase() === aesthetic.toLowerCase());
}

export async function searchLooks(query) {
  const looks = await fetchLooks();
  if (!query || query.trim() === '') return looks;
  const q = query.toLowerCase().trim();
  return looks.filter(look => 
    look.title.toLowerCase().includes(q) ||
    look.aesthetic.toLowerCase().includes(q) ||
    look.description.toLowerCase().includes(q)
  );
}