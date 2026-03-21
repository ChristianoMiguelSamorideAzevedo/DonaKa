/**
 * details.js — DonaKa Web v2
 * Fetch product by ID from URL, render detail view, favorites toggle
 */

import { isFavorite, toggleFavorite } from './favorites.js';

const API_BASE    = 'https://fakestoreapi.com/products';
const USD_TO_BRL  = 5.15;

const spinner       = document.getElementById('spinner');
const detailContent = document.getElementById('detail-content');

function showSpinner() { spinner.classList.remove('hidden'); }
function hideSpinner() { spinner.classList.add('hidden'); }

function toBRL(price) {
  return (price * USD_TO_BRL).toFixed(2).replace('.', ',');
}

function generateStars(rating) {
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function getIdFromURL() {
  return new URLSearchParams(window.location.search).get('id');
}

function renderDetail(product) {
  const fav = isFavorite(product.id);

  detailContent.innerHTML = `
    <article class="detail-card" aria-label="${product.title}">
      <div class="detail-img">
        <img src="${product.image}" alt="${product.title}" width="260" height="320" />
      </div>
      <div class="detail-info">
        <span class="detail-cat">${product.category}</span>
        <h1 class="detail-title">${product.title}</h1>
        <p class="detail-price"><small>R$</small> ${toBRL(product.price)}</p>
        <div class="detail-rating" aria-label="Nota: ${product.rating.rate} de 5">
          <span class="stars" aria-hidden="true">${generateStars(product.rating.rate)}</span>
          <span>${product.rating.rate} / 5 — ${product.rating.count} avaliações</span>
        </div>
        <p class="detail-desc">${product.description}</p>
        <div class="detail-actions">
          <button
            id="fav-btn"
            class="btn-fav-detail ${fav ? 'is-fav' : ''}"
            aria-label="${fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}"
            aria-pressed="${fav}"
          >${fav ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}</button>
        </div>
      </div>
    </article>
  `;

  document.getElementById('fav-btn').addEventListener('click', () => {
    const nowFav = toggleFavorite(product);
    const btn = document.getElementById('fav-btn');
    btn.classList.toggle('is-fav', nowFav);
    btn.setAttribute('aria-pressed', nowFav);
    btn.setAttribute('aria-label', nowFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    btn.textContent = nowFav ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos';
  });
}

function renderError(msg) {
  detailContent.innerHTML = `
    <div class="empty-state">
      <span class="empty-emoji">⚠️</span>
      <h3>Produto não encontrado</h3>
      <p>${msg}</p>
      <a href="index.html" class="btn-cta">← Voltar à loja</a>
    </div>
  `;
}

async function fetchProduct(id) {
  showSpinner();
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok) throw new Error(`Produto não encontrado (status ${res.status})`);
    const product = await res.json();
    renderDetail(product);
  } catch (err) {
    renderError(err.message);
  } finally {
    hideSpinner();
  }
}

const id = getIdFromURL();
if (!id || isNaN(Number(id))) {
  renderError('Nenhum ID de produto válido foi fornecido.');
} else {
  fetchProduct(id);
}
