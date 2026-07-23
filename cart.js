const cartItemsContainer = document.querySelector("#cart-items");
const cartTotalDisplay = document.querySelector("#cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const totalQuantity = cart.reduce((sum, product) => {
        return sum + product.quantity;
    }, 0);

    const cartLinks = document.querySelectorAll(".cart-link");

    cartLinks.forEach(link => {
        link.textContent = `Cart (${totalQuantity})`;
    });
}

function displayCart() {
    cartItemsContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalDisplay.textContent = "$0.00";

        updateCartCount();
        return;
    }

    cart.forEach((product, index) => {
        const price = parseFloat(
            product.price.replace("$", "").replace(" USD", "")
        );

        total += price * product.quantity;

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p>Size: ${product.size}</p>
                <p>Quantity: ${product.quantity}</p>
            </div>

            <div>
                <p>$${(price * product.quantity).toFixed(2)}</p>

                <button class="remove-item" data-index="${index}">
                    REMOVE
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalDisplay.textContent = `$${total.toFixed(2)}`;

    updateCartCount();
    addRemoveListeners();
}

function addRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            displayCart();
        });
    });
}

displayCart();