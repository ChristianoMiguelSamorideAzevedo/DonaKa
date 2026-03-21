/**
 * favorites.js — DonaKa Web v2
 * LocalStorage helpers (exported) + favorites page rendering (auto-run)
 */

const STORAGE_KEY = 'donakaFavorites';

// ---- Helpers (exports) ----

export function getFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

export function isFavorite(id) {
  return getFavorites().some(p => p.id === id);
}

export function toggleFavorite(product) {
  const favs  = getFavorites();
  const index = favs.findIndex(p => p.id === product.id);
  if (index > -1) {
    favs.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    return false;
  }
  favs.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  return true;
}

// ---- Favorites Page ----

const USD_TO_BRL = 5.15;

function toBRL(usdPrice) {
  return (usdPrice * USD_TO_BRL).toFixed(2).replace('.', ',');
}

function generateStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function renderFavoritesPage() {
  const grid   = document.getElementById('favorites-grid');
  const empty  = document.getElementById('empty-favorites');
  if (!grid) return;

  const favs = getFavorites();

  if (favs.length === 0) {
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = '';

  const fragment = document.createDocumentFragment();

  favs.forEach(product => {
    const article = document.createElement('article');
    article.className = 'product-card';

    article.innerHTML = `
      <div class="card-img-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy" width="150" height="150" />
      </div>
      <div class="card-body">
        <p class="card-name">${product.title}</p>
        <div class="card-stars" aria-hidden="true">${generateStars(product.rating.rate)}</div>
        <span class="card-rating-count">(${product.rating.count} avaliações)</span>
        <p class="card-price"><small>R$</small> ${toBRL(product.price)}</p>
      </div>
      <div class="card-footer">
        <a href="details.html?id=${product.id}" class="btn-detail">Ver detalhes</a>
        <button class="btn-fav is-fav" data-id="${product.id}" aria-label="Remover dos favoritos" aria-pressed="true">❤️</button>
      </div>
    `;

    article.querySelector('.btn-fav').addEventListener('click', () => {
      toggleFavorite(product);
      article.style.transition = 'opacity .25s, transform .25s';
      article.style.opacity = '0';
      article.style.transform = 'scale(0.92)';
      setTimeout(() => {
        article.remove();
        if (getFavorites().length === 0) empty.classList.remove('hidden');
      }, 260);
    });

    fragment.appendChild(article);
  });

  grid.appendChild(fragment);
}

// Auto-run on favorites page
if (document.getElementById('favorites-grid')) {
  renderFavoritesPage();
}
