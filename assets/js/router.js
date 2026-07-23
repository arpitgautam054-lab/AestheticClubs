import { fetchLooks, getLooksByAesthetic, getLookById } from './data-loader.js';
import { toggleWishlist, isLookSaved, updateWishlistUI } from './wishlist.js';
import { trackAffiliateClick } from './analytics.js';

document.addEventListener('DOMContentLoaded', async () => {
  const path = window.location.pathname;
  updateWishlistUI();

  if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
    await initHomepage();
  } else if (path.endsWith('look.html')) {
    await initLookPage();
  }
});

async function initHomepage() {
  const grid = document.getElementById('looksGrid');
  if (!grid) return;
  const looks = await fetchLooks();
  renderGrid(looks, grid);
}

async function initLookPage() {
  const container = document.getElementById('lookDetailContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const lookId = params.get('id');
  if (!lookId) return;

  const look = await getLookById(lookId);
  if (!look) return;

  container.innerHTML = `
    <div style="display:flex; gap:30px; flex-wrap:wrap; padding:20px 0;">
      <div style="flex:1; min-width:300px;">
        <img src="${look.pinImage}" alt="${look.title}" style="width:100%; border-radius:8px;">
      </div>
      <div style="flex:1; min-width:300px;">
        <span class="aesthetic-badge">${look.aesthetic}</span>
        <h1 style="margin:10px 0;">${look.title}</h1>
        <p>${look.description}</p>
        <h3 style="margin-top:20px;">Items in this look:</h3>
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
          ${look.items.map(item => `
            <div style="display:flex; justify-between; align-items:center; border:1px solid #E4E4E7; padding:10px; border-radius:6px;">
              <div>
                <strong>${item.name}</strong> (${item.merchant})
                <br><span style="color:#C5A059; font-weight:bold;">${item.price}</span>
              </div>
              <button class="btn-primary btn-gold buy-btn" data-url="${item.affiliateUrl}" data-name="${item.name}" data-merchant="${item.merchant}" style="width:auto; padding:8px 16px;">
                Buy Item
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.getAttribute('data-url');
      const name = e.currentTarget.getAttribute('data-name');
      const merchant = e.currentTarget.getAttribute('data-merchant');
      trackAffiliateClick(name, merchant, url);
    });
  });
}

function renderGrid(looks, container) {
  container.innerHTML = looks.map(look => `
    <article class="look-card">
      <a href="look.html?id=${look.id}" class="look-card-image-wrapper">
        <img src="${look.pinImage}" alt="${look.title}">
        <span class="aesthetic-badge">${look.aesthetic}</span>
      </a>
      <div class="look-card-content">
        <h3 class="look-title"><a href="look.html?id=${look.id}">${look.title}</a></h3>
        <p class="look-meta">${look.items ? look.items.length : 0} items included</p>
      </div>
    </article>
  `).join('');
}