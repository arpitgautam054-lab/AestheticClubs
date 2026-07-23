import { CONFIG } from './config.js';

export function getWishlist() {
  try {
    const data = localStorage.getItem(CONFIG.STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleWishlist(lookId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(lookId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(lookId);
  }
  localStorage.setItem(CONFIG.STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  updateWishlistUI();
  return wishlist.includes(lookId);
}

export function isLookSaved(lookId) {
  return getWishlist().includes(lookId);
}

export function updateWishlistUI() {
  const wishlist = getWishlist();
  const badge = document.getElementById('wishlistCount');
  if (badge) {
    badge.textContent = wishlist.length;
  }
}

document.addEventListener('DOMContentLoaded', updateWishlistUI);