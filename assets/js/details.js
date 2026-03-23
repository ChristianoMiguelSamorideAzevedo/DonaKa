import { isFavorite, toggleFavorite } from "./favorites.js";

const API_BASE = "https://fakestoreapi.com/products";
const USD_TO_BRL = 5.15;
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const spinner = document.getElementById("spinner");
const detailContent = document.getElementById("detail-content");

function showSpinner() {
  spinner?.classList.remove("hidden");
}
function hideSpinner() {
  spinner?.classList.add("hidden");
}
function toBRL(price) {
  return BRL.format(price * USD_TO_BRL);
}
function generateStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}
function getIdFromURL() {
  return new URLSearchParams(window.location.search).get("id");
}

function renderDetail(product) {
  const fav = isFavorite(product.id);
  detailContent.innerHTML = `
    <article class="detail-card" aria-labelledby="prod-title">
      <div class="detail-img">
        <img src="${product.image}" alt="${product.title}" loading="lazy" width="260" height="320" />
      </div>
      <section class="detail-info">
        <span class="detail-cat">${product.category}</span>
        <h1 id="prod-title" class="detail-title">${product.title}</h1>
        <div class="detail-rating" aria-label="Avaliação">
          <span class="stars" aria-hidden="true">${generateStars(product.rating.rate)}</span>
          <span>${product.rating.rate} / 5 — ${product.rating.count} avaliações</span>
        </div>
        <p class="detail-price"><small>R$</small> ${toBRL(product.price)}</p>
        <p class="detail-desc">${product.description}</p>
        <div class="detail-actions">
          <button
            id="fav-btn"
            class="btn-fav-detail ${fav ? "is-fav" : ""}"
            aria-pressed="${fav}"
            aria-label="${fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
          >${fav ? "❤️ Remover dos Favoritos" : "🤍 Adicionar aos Favoritos"}</button>
          <a href="index.html" class="btn-cta">Voltar para a loja</a>
        </div>
      </section>
    </article>
  `;
  const favBtn = document.getElementById("fav-btn");
  favBtn.addEventListener("click", () => {
    const nowFav = toggleFavorite(product);
    favBtn.classList.toggle("is-fav", nowFav);
    favBtn.setAttribute("aria-pressed", nowFav);
    favBtn.setAttribute(
      "aria-label",
      nowFav ? "Remover dos favoritos" : "Adicionar aos favoritos",
    );
    favBtn.textContent = nowFav
      ? "❤️ Remover dos Favoritos"
      : "🤍 Adicionar aos Favoritos";
  });
}

function renderError(msg) {
  detailContent.innerHTML = `
    <div class="empty-state" role="alert">
      <div class="empty-emoji">⚠️</div>
      <h3>Produto não encontrado</h3>
      <p>${msg}</p>
      <a class="btn-cta" href="index.html">← Voltar à loja</a>
    </div>
  `;
}

async function fetchProduct(id) {
  showSpinner();
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (!res.ok)
      throw new Error(`Produto não encontrado (status ${res.status})`);
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
  renderError("Nenhum ID de produto válido foi fornecido.");
} else {
  fetchProduct(id);
}
