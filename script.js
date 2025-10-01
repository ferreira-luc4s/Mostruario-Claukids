// ====== CARRINHO ======
// Recupera carrinho do localStorage ou inicia vazio
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ====== TOAST ======
// Mostra uma mensagem temporária
function mostrarToast(mensagem, cor = "#4CAF50") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = mensagem;
  toast.style.backgroundColor = cor;
  toast.className = "show";

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

// ====== FUNÇÕES DO CARRINHO ======

// Adiciona produto ao carrinho
function adicionarCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, imagem, quantidade: 1 });
  }

  salvarCarrinho();
  mostrarToast(`${nome} foi adicionado ao carrinho!`, "#4CAF50");
}

// Salva no localStorage e atualiza tela e contador
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
  atualizarContador();
}

// Remove item do carrinho pelo índice
function removerItem(index) {
  const nome = carrinho[index].nome;
  carrinho.splice(index, 1);
  salvarCarrinho();
  mostrarToast(`${nome} foi removido do carrinho!`, "#f44336");
}

// Atualiza carrinho na tela
function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const div = document.createElement("div");
    div.className = "item-carrinho";

    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <span>${item.nome} - R$ ${item.preco} x ${item.quantidade}</span>
      <button onclick="removerItem(${index})">Remover</button>
    `;

    lista.appendChild(div);
  });

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = total.toFixed(2);
}

// Atualiza contador de itens no carrinho
function atualizarContador() {
  const contador = document.getElementById("contador-carrinho");
  if (!contador) return;

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  contador.textContent = totalItens;
}

// Finaliza compra enviando pedido para WhatsApp
function finalizarCompra() {
  if (carrinho.length === 0) {
    mostrarToast("Seu carrinho está vazio!", "#f44336");
    return;
  }

  let mensagem = "Olá, gostaria de finalizar minha compra na Clau Kids:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (R$ ${item.preco} x ${item.quantidade})\n`;
    total += item.preco * item.quantidade;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  const numero = "+5519989393673"; // seu número
  const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

  window.open(url, "_blank");
}

// Inicializa carrinho ao carregar a página
window.onload = () => {
  atualizarCarrinho();
  atualizarContador();
};

// ====== CARROSSEL AUTOMÁTICO ======
let indiceSlide = 0;
const slides = document.querySelectorAll(".slides img");
const totalSlides = slides.length;
const indicadores = document.querySelectorAll(".indicadores span");

// Função para mostrar o slide atual
function mostrarSlide() {
  const slidesContainer = document.querySelector(".slides");
  slidesContainer.style.transform = `translateX(-${indiceSlide * 100}%)`;

  // Atualiza indicadores
  indicadores.forEach((dot, i) => {
    dot.classList.toggle("active", i === indiceSlide);
  });
}

// Função para mudar de slide (setas)
function mudarSlide(n) {
  indiceSlide += n;
  if (indiceSlide >= totalSlides) indiceSlide = 0;
  if (indiceSlide < 0) indiceSlide = totalSlides - 1;
  mostrarSlide();
}

// Função para ir direto para um slide (indicadores)
function irParaSlide(n) {
  indiceSlide = n;
  mostrarSlide();
}

// Carrossel automático
setInterval(() => {
  indiceSlide++;
  if (indiceSlide >= totalSlides) indiceSlide = 0;
  mostrarSlide();
}, 5000);

// Inicializa
window.addEventListener("load", mostrarSlide);

// ====== PRODUTOS (CARREGAR DO JSON) ======
async function carregarProdutos() {
  try {
    const response = await fetch("produtos.json"); // arquivo JSON
    if (!response.ok) throw new Error("Erro ao carregar produtos");
    
    const produtos = await response.json();
    mostrarProdutos(produtos);
  } catch (erro) {
    console.error("Falha ao carregar produtos:", erro);
  }
}

// Renderiza produtos na tela
function mostrarProdutos(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  produtos.forEach(produto => {
    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
      <button onclick="adicionarCarrinho('${produto.nome}', ${produto.preco}, '${produto.imagem}')">
        Adicionar ao Carrinho
      </button>
    `;
    container.appendChild(div);
  });
}

// ====== EXECUTA AO CARREGAR A PÁGINA ======
window.addEventListener("load", () => {
  carregarProdutos(); // agora busca do JSON
  atualizarCarrinho();
  atualizarContador();
});

function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const hamburguer = document.querySelector('.hamburguer');
  menu.classList.toggle('show');
  hamburguer.classList.toggle('active');
}




