document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product");
    const cart = document.getElementById("cart");
    const totalPriceElement = document.getElementById("total-price");
    const resetButton = document.getElementById("reset");
    const payButton = document.getElementById("pay");

    let cartItems = {};
    let totalPrice = 0;

    // 商品をクリック → カートに追加
    products.forEach(product => {
        product.addEventListener("click", () => {
            const name = product.getAttribute("data-name");
            const price = parseInt(product.getAttribute("data-price"));

            if (cartItems[name]) {
                cartItems[name].quantity++;
            } else {
                cartItems[name] = { price: price, quantity: 1 };
            }

            updateCart();
        });
    });

    // カートを更新する関数
    function updateCart() {
        cart.innerHTML = "";
        totalPrice = 0;

        Object.keys(cartItems).forEach(name => {
            const item = cartItems[name];
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${name}</span>
                <div class="quantity-controls">
                    <button class="minus" data-name="${name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus" data-name="${name}">+</button>
                </div>
                <span>¥${itemTotal}</span>
                <button class="delete" data-name="${name}">🗑️</button>
            `;

            cart.appendChild(cartItem);
        });

        totalPriceElement.textContent = `¥${totalPrice}`;

        document.querySelectorAll(".plus").forEach(button => {
            button.addEventListener("click", () => {
                cartItems[button.dataset.name].quantity++;
                updateCart();
            });
        });

        document.querySelectorAll(".minus").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.dataset.name;
                if (cartItems[name].quantity > 1) {
                    cartItems[name].quantity--;
                } else {
                    delete cartItems[name];
                }
                updateCart();
            });
        });

        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", () => {
                delete cartItems[button.dataset.name];
                updateCart();
            });
        });
    }

    resetButton.addEventListener("click", () => {
        cartItems = {};
        updateCart();
    });

    payButton.addEventListener("click", () => {
        password = prompt("支払いパスワードを入力:");
        if (password === "1234") {
            alert(`支払い完了！合計: ¥${totalPrice}`);
        } else {
            alert("パスワードが違います！");
        }
    });
});

// ページが完全に読み込まれたら
window.onload = function() {
    setTimeout(() => {
        document.getElementById("loading").style.display = "none"; // ロード画面を消す
        document.getElementById("content").style.display = "block"; // メインコンテンツを表示
    }, 5000); // 1秒後に実行（読み込みが速すぎるときのため）
};