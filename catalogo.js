window.onload = function() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(cart)) cart = []; // Garante que o carrinho seja um array válido

    function addToCart(button) {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price) || 0;

        console.log("Adicionando ao carrinho:", name, price); // Depuração

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
            let itemPrice = parseFloat(item.price) || 0;
            total += itemPrice;
            cartList.innerHTML += `<li>${item.name} - R$ ${itemPrice.toFixed(2)}
                <button class="remove-item" data-index="${index}">Remover</button></li>`;
        });

        totalPrice.innerText = `Total: R$ ${total.toFixed(2)}`;

        // Adiciona evento aos botões de remoção
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => removeFromCart(button.dataset.index));
        });
    }

    function removeFromCart(index) {
        index = parseInt(index);
        if (!isNaN(index) && index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    }

    window.checkout = function() {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio! Adicione produtos antes de concluir a compra.");
            return;
        }
        document.getElementById("checkout-section").style.display = "block";
        document.getElementById("summary").innerText = `Total da compra: R$ ${cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0).toFixed(2)}`;
    };

    window.showPayment = function(tipo) {
        let paymentInfo = document.getElementById("payment-info");
        let pixQR = document.getElementById("pix-qr");

        if (!paymentInfo || !pixQR) {
            console.error("Elementos de pagamento não encontrados!");
            return;
        }

        paymentInfo.innerHTML = "";
        pixQR.style.display = "none";

        if (tipo === "dinheiro" || tipo === "cartao") {
            paymentInfo.innerHTML = "<p>Pague na hora que receber a entrega ou retirá-la.</p>";
        } else if (tipo === "pix") {
            paymentInfo.innerHTML = "<p>Escaneie o QR Code para pagar via Pix.</p>";
            pixQR.style.display = "block";
        }
    };

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => addToCart(button));
    });

    displayCart();
};
