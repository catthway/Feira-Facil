let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(button) {
  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  let cartList = document.getElementById("cart-list");
  let totalPrice = document.getElementById("total-price");
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartList.innerHTML += `<li>${item.name} - R$${item.price.toFixed(2)}
      <button class="remove-item" onclick="removeFromCart(${index})">Remover</button></li>`;
  });

  totalPrice.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio! Adicione produtos antes de concluir a compra.");
    return;
  }
  document.getElementById("checkout-section").style.display = "block";
  document.getElementById("summary").innerText = `Total da compra: R$ ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
}

// Adicione um event listener para cada botão "Adicionar ao Carrinho"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
  button.addEventListener("click", function() {
    addToCart(this); // Passa o botão clicado para a função addToCart
  });
});

displayCart(); // Exibe o carrinho na carga da página
function showPayment(tipo) {
    let paymentInfo = document.getElementById("payment-info");
    let pixQR = document.getElementById("pix-qr");

    // Resetar a exibição
    paymentInfo.innerHTML = "";
    pixQR.style.display = "none";

    if (tipo === "dinheiro") {
        paymentInfo.innerHTML = "<p>Pagamento em dinheiro será feito na entrega.</p>";
    } else if (tipo === "cartao") {
        paymentInfo.innerHTML = "<p>Pagamento com cartão será realizado na entrega.</p>";
    } else if (tipo === "pix") {
        paymentInfo.innerHTML = "<p>Escaneie o QR Code para pagar via Pix.</p>";
        pixQR.style.display = "block";
    }
}
