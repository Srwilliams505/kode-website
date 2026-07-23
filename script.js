let selectedSize = null;
let quantity = 1;

const sizeButtons = document.querySelectorAll(".size-options button");
const quantityButtons = document.querySelectorAll(".quantity-control button");
const quantityDisplay = document.querySelector(".quantity-control span");

sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        sizeButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedSize = button.textContent;
    });
});

quantityButtons[0].addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});

quantityButtons[1].addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
});

const addToCartButton = document.querySelector(".add-to-cart");

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        const product = {
            name: document.querySelector(".product-details h1").textContent,
            price: document.querySelector(".product-price").textContent,
            size: selectedSize,
            quantity: quantity
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(`${product.name} added to cart.`);
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce((sum, product) => {
        return sum + product.quantity;
    }, 0);

    const cartLinks = document.querySelectorAll(".cart-link");

    cartLinks.forEach(link => {
        link.textContent = `Cart (${totalQuantity})`;
    });
}

updateCartCount();