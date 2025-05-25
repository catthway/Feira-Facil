let carrinho = [];
let total = 0;

window.adicionar = function(nome, preco) {  // Corrigido: Definição global da função
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
};

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalEl = document.getElementById("total");
  lista.innerHTML = "";

  carrinho.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$${item.preco.toFixed(2)} 
      <button class="remove-btn" onclick="remover(${index})">❌</button>`;
    lista.appendChild(li);
  });

  totalEl.textContent = total.toFixed(2);
}

window.remover = function(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
};

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("forma-pagamento");
  const comprovanteContainer = document.getElementById("comprovante-container");
  const chavePixContainer = document.getElementById("chave-pix-container");

  select.addEventListener("change", () => {
    if (select.value === "pix") {
      comprovanteContainer.style.display = "block";
      chavePixContainer.style.display = "block";
      document.getElementById("link-comprovante").required = true;
    } else {
      comprovanteContainer.style.display = "none";
      chavePixContainer.style.display = "none";
      document.getElementById("link-comprovante").required = false;
    }
  });
});

window.finalizarCompra = function() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const formaPagamento = document.getElementById("forma-pagamento").value;
  const comprovante = document.getElementById("link-comprovante").value.trim();

  if (!formaPagamento) {
    alert("Por favor, selecione a forma de pagamento.");
    return;
  }

  let mensagem = "Olá Dona Lourdes! Gostaria de fazer um pedido:%0A";

  carrinho.forEach(item => {
    mensagem += `- ${item.nome} (R$${item.preco.toFixed(2)})%0A`;
  });

  mensagem += `%0ATotal: R$${total.toFixed(2)}%0A`;
  mensagem += `Forma de pagamento: ${formaPagamento.toUpperCase()}%0A`;

  if (formaPagamento === "pix") {
    if (!comprovante) {
      alert("Por favor, cole o link do comprovante Pix.");
      return;
    }
    mensagem += `Comprovante Pix: ${comprovante}%0A`;
    mensagem += `Pagamento já realizado. Obrigada!%0A`;
  } else {
    mensagem += `Pagamento será efetuado na entrega ou retirada.%0A`;
  }

  const link = `https://wa.me/5542999696273?text=${mensagem}`;
  window.open(link, "_blank");
};
