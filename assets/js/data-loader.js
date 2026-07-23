// Load and Render Looks Data
async function loadLooks() {
    try {
        const response = await fetch('assets/data/looks.json');
        const looks = await response.json();
        renderLooks(looks);
    } catch (error) {
        console.error('Error loading looks:', error);
    }
}

function renderLooks(looks) {
    const container = document.getElementById('looks-grid') || document.querySelector('.cards-container');
    if (!container) return;

    container.innerHTML = looks.map(look => `
        <div class="look-card">
            <div style="position: relative;">
                <span class="aesthetic-badge">${look.badge || look.category}</span>
                <img src="${look.image}" alt="${look.title}" loading="lazy">
            </div>
            <div style="padding: 20px;">
                <h3 style="margin: 0 0 10px; font-family: var(--font-serif); font-size: 1.25rem;">${look.title}</h3>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 16px;">${look.description}</p>
                
                <!-- Items list with EarnKaro Links -->
                <div class="look-items-list" style="display: flex; flex-direction: column; gap: 10px;">
                    ${look.items.map(item => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-surface); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-light);">
                            <div>
                                <strong style="font-size: 0.85rem; display: block;">${item.name}</strong>
                                <span style="font-size: 0.75rem; color: var(--text-muted);">${item.brand} • ${item.price}</span>
                            </div>
                            <a href="${item.buyUrl}" target="_blank" rel="noopener noreferrer" class="pill" style="padding: 6px 14px; font-size: 0.78rem; text-decoration: none;">
                                Shop Now ↗
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', loadLooks);