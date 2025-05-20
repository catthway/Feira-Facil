let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (!Array.isArray(cart)) cart = []; // Garante que o carrinho seja um array válido

function addToCart(button) {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price) || 0; // Garante que o preço seja um número válido

    if (!name || isNaN(price)) {
        alert("Erro ao adicionar ao carrinho: item inválido.");
        return;
    }

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
        let itemPrice = parseFloat(item.price) || 0; // Evita valores inválidos
        total += itemPrice;
        cartList.innerHTML += `<li>${item.name} - R$ ${itemPrice.toFixed(2)}
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
    document.getElementById("summary").innerText = `Total da compra: R$ ${cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2)}`;
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        addToCart(this);
    });
});

displayCart(); // Exibe o carrinho ao carregar a página

function showPayment(tipo) {
    let paymentInfo = document.getElementById("payment-info");
    let pixQR = document.getElementById("pix-qr");

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
