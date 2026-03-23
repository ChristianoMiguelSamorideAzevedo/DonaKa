import { isFavorite, toggleFavorite } from "./favorites.js";

// ---- Constants ----
const API_URL = "https://fakestoreapi.com/products";

// Centralize the exchange rate (reusable across the file)
const USD_TO_BRL = 5.15;

// Locale-aware currency formatter (pt-BR)
const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// ---- DOM ----
const spinner = document.getElementById("spinner");
const productsGrid = document.getElementById("products-grid");
const productsCount = document.getElementById("products-count");
const searchInput = document.getElementById("main-search");
const emptyState = document.getElementById("empty-state");
const categoryBtns = document.querySelectorAll(".sidebar-item[data-category]");

// ---- State ----
let allProducts = [];
let activeCategory = "all";
let searchQuery = "";

// ---- Spinner ----
function showSpinner() {
  spinner?.classList.remove("hidden");
}
function hideSpinner() {
  spinner?.classList.add("hidden");
}

// ---- Helpers ----
function toBRL(usdPrice) {
  // Agora com Intl.NumberFormat (mais robusto e padronizado)
  return BRL.format(usdPrice * USD_TO_BRL);
}

function generateStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

// ---- Category Buttons ----
function setActiveCategory(category) {
  activeCategory = category;
  categoryBtns.forEach((btn) => {
    btn.classList.toggle(
      "sidebar-item--active",
      btn.dataset.category === category,
    );
  });
  renderProducts();
}

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => setActiveCategory(btn.dataset.category));
});

// ---- Search ----
if (searchInput) {
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderProducts();
  });
}

// ---- Filter ----
function getFilteredProducts() {
  return allProducts.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });
}

// ---- Render Card ----
function createCard(product) {
  const fav = isFavorite(product.id);

  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.id = product.id;

  article.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="${product.image}"
        alt="${product.title}"
        loading="lazy"
        width="150"
        height="150"
      />
    </div>
    <div class="card-body">
      <p class="card-name">${product.title}</p>
      <div class="card-stars" aria-hidden="true">${generateStars(product.rating.rate)}</div>
      <span class="card-rating-count">(${product.rating.count} avaliações)</span>
      <p class="card-price"><small>R$</small> ${toBRL(product.price)}</p>
    </div>
    <div class="card-footer">
      <a href="details.html?id=${product.id}" class="btn-detail">Ver detalhes</a>
      <button
        class="btn-fav ${fav ? "is-fav" : ""}"
        data-id="${product.id}"
        aria-label="${fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
        aria-pressed="${fav}"
      >${fav ? "❤️" : "🤍"}</button>
    </div>
  `;

  article.querySelector(".btn-fav").addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.currentTarget;
    const nowFav = toggleFavorite(product);
    btn.classList.toggle("is-fav", nowFav);
    btn.setAttribute("aria-pressed", nowFav);
    btn.setAttribute(
      "aria-label",
      nowFav ? "Remover dos favoritos" : "Adicionar aos favoritos",
    );
    btn.textContent = nowFav ? "❤️" : "🤍";
  });

  return article;
}

// ---- Render Products ----
function renderProducts() {
  const filtered = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
    productsCount.textContent = "0 produtos";
    return;
  }

  emptyState.classList.add("hidden");
  productsCount.textContent = `${filtered.length} produto${filtered.length !== 1 ? "s" : ""}`;

  const fragment = document.createDocumentFragment();
  filtered.forEach((p) => fragment.appendChild(createCard(p)));
  productsGrid.appendChild(fragment);
}

// ---- Fetch ----
async function fetchProducts() {
  showSpinner();
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
    allProducts = await res.json();
    renderProducts();
  } catch (err) {
    productsGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="empty-emoji">⚠️</span>
        <h3>Falha ao carregar produtos</h3>
        <p>${err.message}</p>
        <button class="btn-cta" id="retry-btn">Tentar novamente</button>
      </div>
    `;
    document
      .getElementById("retry-btn")
      ?.addEventListener("click", fetchProducts);
  } finally {
    hideSpinner();
  }
}

fetchProducts();
