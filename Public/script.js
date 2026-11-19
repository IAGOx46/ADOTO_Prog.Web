// Adotô — lógica do protótipo (dados temporários, sem backend)
"use strict";

const photos = {
  luna: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=85",
  thor: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=85",
  mimi: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&q=85",
  bob: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=85",
  nina: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=900&q=85",
  max: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=900&q=85"
};

let animals = [
  { id: 1, name: "Luna", type: "Cachorro", breed: "SRD", age: "Filhote", sex: "Fêmea", city: "Itacoatiara, AM", desc: "Uma companheira carinhosa, brincalhona e cheia de energia. Está procurando uma família para chamar de sua!", img: photos.luna, owner: "Mariana", phone: "5592993648965" },
  { id: 2, name: "Thor", type: "Cachorro", breed: "Golden Retriever", age: "Adulto", sex: "Macho", city: "Manaus, AM", desc: "Muito dócil e companheiro. Adora passeios e brincar ao ar livre. Procura um lar cheio de carinho.", img: photos.thor, owner: "Pedro", phone: "5592993648965" },
  { id: 3, name: "Mimi", type: "Gato", breed: "SRD", age: "Filhote", sex: "Fêmea", city: "Itacoatiara, AM", desc: "Pequena, curiosa e muito amorosa. Já está pronta para conhecer sua nova família.", img: photos.mimi, owner: "Ana", phone: "5592993648965" },
  { id: 4, name: "Bob", type: "Cachorro", breed: "SRD", age: "Adulto", sex: "Macho", city: "Manaus, AM", desc: "Um amigo leal e tranquilo. Se dá bem com pessoas e gosta de receber atenção.", img: photos.bob, owner: "Lucas", phone: "5592993648965" },
  { id: 5, name: "Nina", type: "Gato", breed: "SRD", age: "Jovem", sex: "Fêmea", city: "Itacoatiara, AM", desc: "Independente, tranquila e muito curiosa. Espera por um cantinho seguro e acolhedor.", img: photos.nina, owner: "Julia", phone: "5592993648965" },
  { id: 6, name: "Max", type: "Gato", breed: "SRD", age: "Filhote", sex: "Macho", city: "Manaus, AM", desc: "Um gatinho cheio de personalidade e carinho para oferecer. Quer ser seu novo melhor amigo.", img: photos.max, owner: "Rafael", phone: "5592993648965" }
];

let user = null;
let activeFilter = "Todos";
let searchTerm = "";
const screen = document.querySelector("#screen");
const toastElement = document.querySelector("#toast");
const navAuth = document.querySelector(".nav-auth");

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function showToast(message) {
  toastElement.textContent = message;
  toastElement.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toastElement.hidden = true; }, 2500);
}

function updateNavigation() {
  navAuth.textContent = user ? "Sair" : "Entrar";
  navAuth.dataset.action = user ? "logout" : "login";
}

function renderWelcome() {
  screen.innerHTML = `
    <section class="welcome">
      <div class="welcome-copy">
        <div class="eyebrow">Um novo começo começa aqui</div>
        <h1>Todo pet merece um lar cheio de <span style="color:var(--green)">amor.</span></h1>
        <p>Encontre seu novo melhor amigo ou ajude um animal a encontrar uma família. A próxima história feliz pode começar com você.</p>
        <div class="welcome-actions">
          <button class="button button-primary" data-action="home">Encontrar um amigo 🐾</button>
          <button class="button button-outline" data-action="register">Criar minha conta</button>
        </div>
        <p class="muted">Adoção responsável. Amor sem medidas.</p>
      </div>
      <div class="welcome-photo"><img src="${photos.luna}" alt="Cachorro esperando por um lar"></div>
    </section>`;
  updateNavigation();
}

function renderHome() {
  const filteredAnimals = animals.filter(animal => {
    const matchesType = activeFilter === "Todos" || animal.type === activeFilter;
    const searchable = `${animal.name} ${animal.type} ${animal.breed} ${animal.city}`.toLowerCase();
    return matchesType && searchable.includes(searchTerm.toLowerCase());
  });

  screen.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">Adotar transforma vidas</div>
        <h1>Seu próximo melhor amigo está aqui.</h1>
        <p>Conheça animais que estão esperando por uma família. Um encontro pode mudar duas vidas.</p>
        <button class="button button-primary" data-action="scroll-catalog">Ver animais disponíveis</button>
      </div>
      <div class="hero-image"><img src="${photos.thor}" alt="Cachorro para adoção"></div>
    </section>
    <div class="searchbar">
      <input id="search-input" type="search" placeholder="🔎 Buscar por nome, raça ou cidade..." value="${escapeHTML(searchTerm)}">
      <button class="button button-primary" data-action="search">Buscar</button>
    </div>
    <section id="catalog">
      <div class="section-head">
        <div><div class="eyebrow">Encontre seu companheiro</div><h2>Animais para adoção</h2></div>
        <span class="muted">${filteredAnimals.length} encontrados</span>
      </div>
      <div class="filters">
        ${["Todos", "Cachorro", "Gato"].map(type => `
          <button class="chip ${activeFilter === type ? "active" : ""}" data-filter="${type}">
            ${type === "Todos" ? "Todos" : type === "Cachorro" ? "🐶 Cachorros" : "🐱 Gatos"}
          </button>`).join("")}
      </div>
      <div class="pet-grid">
        ${filteredAnimals.length ? filteredAnimals.map(animal => `
          <article class="pet-card" data-pet-id="${animal.id}" tabindex="0" role="button" aria-label="Ver anúncio de ${escapeHTML(animal.name)}">
            <img src="${escapeHTML(animal.img)}" alt="${escapeHTML(animal.name)}">
            <div class="pet-info">
              <h3>${escapeHTML(animal.name)}</h3>
              <p>${escapeHTML(animal.breed)} · ${escapeHTML(animal.age)}</p>
              <div class="pet-bottom"><span class="tag">${escapeHTML(animal.type)}</span><span class="location">📍 ${escapeHTML(animal.city)}</span></div>
            </div>
          </article>`).join("") : `<div class="empty">Não encontramos animais com essa busca. Tente outro termo. 🐾</div>`}
      </div>
    </section>`;
  updateNavigation();
}

function renderAuth(mode) {
  const isRegister = mode === "register";
  screen.innerHTML = `
    <section class="page"><div class="panel">
      <button class="back" data-action="welcome">← Voltar</button>
      <div class="eyebrow">${isRegister ? "Faça parte dessa história" : "Que bom ter você de volta"}</div>
      <h2>${isRegister ? "Crie sua conta" : "Entrar no Adotô"}</h2>
      <p class="muted">${isRegister ? "Cadastre-se para encontrar ou divulgar animais." : "Acesse sua conta e continue por aqui."}</p>
      <form id="auth-form">
        ${isRegister ? `<div class="field"><label for="register-name">Nome completo</label><input id="register-name" required placeholder="Como podemos chamar você?"></div>` : ""}
        <div class="field"><label for="email">E-mail</label><input id="email" type="email" required placeholder="seuemail@exemplo.com"></div>
        <div class="field"><label for="password">Senha</label><input id="password" type="password" required minlength="4" placeholder="Digite sua senha"></div>
        ${isRegister ? `
          <div class="field"><label for="phone">WhatsApp com DDD</label><input id="phone" type="tel" required placeholder="(92) 993648965"></div>
          <div class="notice">📱 Seu WhatsApp será usado para que interessados possam conversar com você sobre os animais anunciados.</div>` : ""}
        <button class="button button-primary button-full" type="submit">${isRegister ? "Criar conta" : "Entrar na minha conta"}</button>
      </form>
      <p class="auth-switch">${isRegister ? "Já possui uma conta?" : "Ainda não tem conta?"}
        <button data-action="${isRegister ? "login" : "register"}">${isRegister ? "Fazer login" : "Cadastre-se"}</button>
      </p>
    </div></section>`;
}

function renderDetail(id) {
  const animal = animals.find(item => item.id === Number(id));
  if (!animal) return renderHome();
  const whatsappNumber = String(animal.phone || "").replace(/\D/g, "");
  const message = encodeURIComponent(`Olá! Vi o anúncio de ${animal.name} no Adotô e gostaria de saber mais sobre a adoção.`);
  screen.innerHTML = `
    <section class="page">
      <button class="back" data-action="home">← Voltar aos anúncios</button>
      <div class="detail">
        <div>
          <img class="detail-image" src="${escapeHTML(animal.img)}" alt="${escapeHTML(animal.name)}">
          <div class="detail-box"><h3>Sobre ${escapeHTML(animal.name)}</h3><p>${escapeHTML(animal.desc)}</p></div>
        </div>
        <div>
          <span class="tag">Disponível para adoção</span>
          <h1>${escapeHTML(animal.name)}</h1><p>📍 ${escapeHTML(animal.city)}</p>
          <div class="detail-box">
            <div class="eyebrow">Conheça melhor</div>
            <div class="detail-facts">
              <div><span>Espécie</span><strong>${escapeHTML(animal.type)}</strong></div>
              <div><span>Raça</span><strong>${escapeHTML(animal.breed)}</strong></div>
              <div><span>Idade</span><strong>${escapeHTML(animal.age)}</strong></div>
              <div><span>Sexo</span><strong>${escapeHTML(animal.sex)}</strong></div>
            </div>
          </div>
          <div class="detail-box">
            <span class="muted">Anunciado por</span><strong style="display:block;margin:5px 0 15px">${escapeHTML(animal.owner)}</strong>
            <a class="button button-primary button-full" href="https://wa.me/${whatsappNumber}?text=${message}" target="_blank" rel="noopener noreferrer">☏ Conversar pelo WhatsApp</a>
            <p style="font-size:10px;text-align:center;margin-bottom:0">Converse diretamente com o responsável pelo animal.</p>
          </div>
        </div>
      </div>
    </section>`;
}

function renderCreate() {
  if (!user) { showToast("Entre ou cadastre-se para publicar um anúncio."); return renderAuth("login"); }
  screen.innerHTML = `
    <section class="page"><button class="back" data-action="home">← Voltar</button>
      <div class="panel" style="max-width:650px">
        <div class="eyebrow">Compartilhe uma nova história</div><h2>Criar anúncio</h2>
        <p class="muted">Conte um pouco sobre o animal que está procurando um lar.</p>
        <form id="create-form">
          <div class="field"><label for="pet-name">Nome do animal</label><input id="pet-name" required placeholder="Ex.: Mel"></div>
          <div class="two">
            <div class="field"><label for="pet-type">Espécie</label><select id="pet-type"><option>Cachorro</option><option>Gato</option></select></div>
            <div class="field"><label for="pet-sex">Sexo</label><select id="pet-sex"><option>Fêmea</option><option>Macho</option></select></div>
          </div>
          <div class="two">
            <div class="field"><label for="pet-breed">Raça</label><input id="pet-breed" placeholder="Ex.: SRD"></div>
            <div class="field"><label for="pet-age">Idade</label><select id="pet-age"><option>Filhote</option><option>Jovem</option><option>Adulto</option><option>Idoso</option></select></div>
          </div>
          <div class="field"><label for="pet-city">Localização</label><input id="pet-city" required placeholder="Cidade, Estado"></div>
          <div class="field"><label for="pet-desc">Descrição</label><textarea id="pet-desc" required placeholder="Conte sobre a personalidade, cuidados e história do animal..."></textarea></div>
          <div class="field"><label for="pet-img">Link de uma foto (opcional)</label><input id="pet-img" type="url" placeholder="https://..."></div>
          <div class="notice">Seu contato será feito pelo WhatsApp cadastrado no seu perfil.</div>
          <button class="button button-primary button-full" type="submit">Publicar anúncio</button>
        </form>
      </div>
    </section>`;
}

function renderProfile() {
  if (!user) { showToast("Entre para acessar seu perfil."); return renderAuth("login"); }
  const myAnimals = animals.filter(animal => animal.owner === user.name);
  screen.innerHTML = `
    <section class="page"><button class="back" data-action="home">← Voltar ao início</button>
      <div class="panel">
        <div class="profile-head"><div class="avatar">👤</div><div><h2>Meu perfil</h2><span class="muted">Gerencie seus dados pessoais</span></div></div>
        <form id="profile-form">
          <div class="field"><label for="profile-name">Nome completo</label><input id="profile-name" required value="${escapeHTML(user.name)}"></div>
          <div class="field"><label for="profile-email">E-mail</label><input id="profile-email" type="email" value="${escapeHTML(user.email)}" disabled></div>
          <div class="field"><label for="profile-phone">WhatsApp</label><input id="profile-phone" required value="${escapeHTML(user.phone || "")}" placeholder="Seu número com DDD"></div>
          <button class="button button-primary button-full" type="submit">Salvar alterações</button>
        </form>
        <div class="section-head"><h2 style="font-size:17px">Meus anúncios</h2></div>
        <div style="display:grid;gap:9px">
          ${myAnimals.length ? myAnimals.map(animal => `
            <div class="my-listing"><img src="${escapeHTML(animal.img)}" alt=""><div class="my-listing-info"><strong style="font-size:13px">${escapeHTML(animal.name)}</strong><div class="muted" style="font-size:11px">${escapeHTML(animal.city)}</div></div><button class="chip" data-pet-id="${animal.id}">Ver</button></div>`).join("") : `<p class="muted">Você ainda não publicou anúncios.</p>`}
        </div>
        <button class="button button-outline button-full" data-action="create">+ Criar anúncio</button>
        <button class="button button-cream button-full" data-action="logout">Sair da conta</button>
      </div>
    </section>`;
}

function navigate(action, element) {
  switch (action) {
    case "home": renderHome(); break;
    case "welcome": renderWelcome(); break;
    case "login": renderAuth("login"); break;
    case "register": renderAuth("register"); break;
    case "create": renderCreate(); break;
    case "profile": renderProfile(); break;
    case "logout": user = null; showToast("Você saiu da conta."); renderWelcome(); break;
    case "search": searchTerm = document.querySelector("#search-input").value.trim(); renderHome(); break;
    case "scroll-catalog": document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" }); break;
  }
}

// Delegação de eventos: os botões continuam funcionando mesmo quando as telas são recriadas.
document.addEventListener("click", event => {
  const actionElement = event.target.closest("[data-action]");
  const filterElement = event.target.closest("[data-filter]");
  const petElement = event.target.closest("[data-pet-id]");

  if (filterElement) {
    activeFilter = filterElement.dataset.filter;
    renderHome();
    return;
  }
  if (petElement) {
    renderDetail(petElement.dataset.petId);
    return;
  }
  if (actionElement) navigate(actionElement.dataset.action, actionElement);
});

document.addEventListener("keydown", event => {
  const petElement = event.target.closest(".pet-card[data-pet-id]");
  if (petElement && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    renderDetail(petElement.dataset.petId);
  }
  if (event.target.id === "search-input" && event.key === "Enter") {
    searchTerm = event.target.value.trim();
    renderHome();
  }
});

document.addEventListener("submit", event => {
  if (event.target.id === "auth-form") {
    event.preventDefault();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    if (event.submitter && event.submitter.form) {
      const nameInput = document.querySelector("#register-name");
      if (nameInput) {
        user = {
          name: nameInput.value.trim(),
          email,
          phone: document.querySelector("#phone").value.trim()
        };
        showToast("Conta criada com sucesso!");
      } else {
        user = { name: email.split("@")[0], email, phone: "" };
        showToast("Bem-vindo de volta!");
      }
      renderHome();
    }
  }

  if (event.target.id === "create-form") {
    event.preventDefault();
    if (!user) return renderAuth("login");
    const type = document.querySelector("#pet-type").value;
    const newAnimal = {
      id: Date.now(),
      name: document.querySelector("#pet-name").value.trim(),
      type,
      sex: document.querySelector("#pet-sex").value,
      breed: document.querySelector("#pet-breed").value.trim() || "SRD",
      age: document.querySelector("#pet-age").value,
      city: document.querySelector("#pet-city").value.trim(),
      desc: document.querySelector("#pet-desc").value.trim(),
      img: document.querySelector("#pet-img").value.trim() || (type === "Gato" ? photos.mimi : photos.luna),
      owner: user.name,
      phone: user.phone
    };
    animals.unshift(newAnimal);
    showToast("Anúncio publicado!");
    renderDetail(newAnimal.id);
  }

  if (event.target.id === "profile-form") {
    event.preventDefault();
    const oldName = user.name;
    user.name = document.querySelector("#profile-name").value.trim();
    user.phone = document.querySelector("#profile-phone").value.trim();
    animals.forEach(animal => {
      if (animal.owner === oldName) {
        animal.owner = user.name;
        animal.phone = user.phone;
      }
    });
    showToast("Perfil atualizado!");
    renderProfile();
  }
});

renderWelcome();
