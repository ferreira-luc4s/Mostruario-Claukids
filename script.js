let produtosCarregados = [];

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();

  // Seleciona o filtro de categoria
  const seletor = document.getElementById("seletor-categoria");
  seletor.addEventListener("change", () => {
    const filtroSelecionado = seletor.value;
    mostrarProdutos(produtosCarregados, filtroSelecionado);
  });
});

async function carregarProdutos() {
  try {
    const response = await fetch("produtos.json");
    if (!response.ok) {
      throw new Error(`Erro ao carregar JSON: ${response.status}`);
    }
    const produtos = await response.json();
    produtosCarregados = produtos;
    mostrarProdutos(produtos, "todos");
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    document.getElementById("produtos-kids").innerHTML = `<p style="color:red">Erro ao carregar produtos.</p>`;
    document.getElementById("produtos-adulto").innerHTML = `<p style="color:red">Erro ao carregar produtos.</p>`;
  }
}

function mostrarProdutos(produtos, filtro = "todos") {
  const kidsContainer = document.getElementById("produtos-kids");
  const adultoContainer = document.getElementById("produtos-adulto");
  const secaoKids = document.getElementById("secao-kids");
  const secaoAdulto = document.getElementById("secao-adulto");

  kidsContainer.innerHTML = "";
  adultoContainer.innerHTML = "";

  const produtosFiltrados = produtos.filter(produto => {
    if (filtro === "todos") return true;
    return produto.categoria === filtro;
  });

  // Preenche os containers
  produtosFiltrados.forEach(produto => {
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

  // Mostra/oculta seções com base no filtro
  if (filtro === "kids") {
    secaoKids.style.display = "block";
    secaoAdulto.style.display = "none";
  } else if (filtro === "adulto") {
    secaoKids.style.display = "none";
    secaoAdulto.style.display = "block";
  } else {
    secaoKids.style.display = "block";
    secaoAdulto.style.display = "block";
  }
}

// Modal
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

function fecharModal() {
  const modal = document.querySelector(".modal");
  if (modal) modal.remove();
}
