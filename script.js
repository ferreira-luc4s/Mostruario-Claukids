// script.js — carrega os produtos do JSON e exibe no mostruário

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
});

async function carregarProdutos() {
  try {
    const response = await fetch("produtos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const produtos = await response.json();
    mostrarProdutos(produtos);
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    const container = document.getElementById("produtos");
    if (container) {
      container.innerHTML = `<p style="color: red;">Erro ao carregar produtos.</p>`;
    }
  }
}

function mostrarProdutos(produtos) {
  const kidsContainer = document.getElementById("produtos-kids");
  const adultoContainer = document.getElementById("produtos-adulto");

  if (!kidsContainer || !adultoContainer) return;

  kidsContainer.innerHTML = "";
  adultoContainer.innerHTML = "";

  produtos.forEach(produto => {
    if (!produto.nome || !produto.imagem || !produto.categoria) return;

    const div = document.createElement("div");
    div.className = "produto";
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" onclick="abrirModal('${produto.imagem}', '${produto.nome}')">
      <h3>${produto.nome}</h3>
    `;

    if (produto.categoria === "kids") {
      kidsContainer.appendChild(div);
    } else if (produto.categoria === "adulto") {
      adultoContainer.appendChild(div);
    }
  });
}


// Função para abrir o modal
function abrirModal(imagem, nome) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-conteudo">
      <span class="fechar" onclick="fecharModal()">&times;</span>
      <img src="${imagem}" alt="${nome}">
      <h2>${nome}</h2>
    </div>
  `;
  document.body.appendChild(modal);
}

// Função para fechar o modal
function fecharModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
}

