window.onload = function() {
    let cart = []; // Carrinho agora é apenas uma variável temporária

    function addToCart(button) {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price) || 0;

        if (!name || isNaN(price)) {
            alert("Erro ao adicionar ao carrinho: item inválido.");
            return;
        }

        cart.push({ name, price });
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

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => removeFromCart(button.dataset.index));
        });
    }

    function removeFromCart(index) {
        index = parseInt(index);
        if (!isNaN(index) && index >= 0 && index < cart.length) {
            cart.splice(index, 1);
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

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => addToCart(button));
    });

    displayCart();
};
