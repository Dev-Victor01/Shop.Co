// =====================================================
// SHOP.CO CART
// localStorage is used ONLY for the cart
// =====================================================

const CART_STORAGE_KEY = "shopco_cart";


// =====================================================
// GET CART
// =====================================================

function getCart() {

    const cart = localStorage.getItem(CART_STORAGE_KEY);

    if (!cart) {
        return [];
    }

    try {

        const parsedCart = JSON.parse(cart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {

        console.error("Unable to read cart:", error);

        return [];
    }
}


// =====================================================
// SAVE CART
// =====================================================

function saveCart(cart) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );
}


// =====================================================
// CART COUNT
// =====================================================

function getCartCount() {

    const cart = getCart();

    return cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );
}


// =====================================================
// UPDATE CART BADGE
// =====================================================

function updateCartBadge() {

    const cartBadges =
        document.querySelectorAll("#cart-count");

    const count = getCartCount();

    cartBadges.forEach((badge) => {

        badge.textContent = count;

        if (count > 0) {

            badge.classList.remove("hidden");

        } else {

            badge.classList.add("hidden");
        }

    });
}


// =====================================================
// CREATE UNIQUE CART ITEM KEY
// =====================================================

function createCartItemKey(item) {

    return [
        item.id,
        item.size || "",
        item.color || ""
    ].join("|");
}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addProductToCart(
    product,
    quantity = 1,
    options = {}
) {

    if (!product || !product.id) {

        console.error(
            "Invalid product:",
            product
        );

        return;
    }

    const cart = getCart();

    const newItem = {

        id: product.id,

        name: product.name,

        price: Number(product.price),

        image: product.image,

        quantity: Number(quantity),

        size: options.size || "",

        color: options.color || ""
    };


    const itemKey =
        createCartItemKey(newItem);


    const existingItem = cart.find(
        (item) =>
            createCartItemKey(item) === itemKey
    );


    if (existingItem) {

        existingItem.quantity +=
            newItem.quantity;

    } else {

        cart.push(newItem);
    }


    saveCart(cart);

    updateCartBadge();


    console.log(
        "Added to cart:",
        newItem
    );
}


// =====================================================
// UPDATE QUANTITY
// =====================================================

function updateCartQuantity(
    itemIndex,
    newQuantity
) {

    const cart = getCart();

    if (!cart[itemIndex]) {
        return;
    }


    if (newQuantity <= 0) {

        cart.splice(itemIndex, 1);

    } else {

        cart[itemIndex].quantity =
            Number(newQuantity);
    }


    saveCart(cart);

    renderCart();

    updateCartBadge();
}


// =====================================================
// REMOVE ITEM
// =====================================================

function removeCartItem(itemIndex) {

    const cart = getCart();

    if (!cart[itemIndex]) {
        return;
    }


    cart.splice(itemIndex, 1);

    saveCart(cart);

    renderCart();

    updateCartBadge();
}


// =====================================================
// FORMAT PRICE
// =====================================================

function formatPrice(price) {

    return `$${Number(price).toFixed(0)}`;
}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    const cartContainer =
        document.getElementById("cart-items");


    if (!cartContainer) {
        return;
    }


    const cart = getCart();


    // =================================================
    // EMPTY CART
    // =================================================

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div
                class="flex flex-col items-center justify-center py-16 text-center"
            >

                <div
                    class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5"
                >

                    <i
                        class="fa-solid fa-cart-shopping text-3xl text-gray-400"
                    ></i>

                </div>


                <h2 class="text-2xl font-bold mb-2">
                    Your cart is empty
                </h2>


                <p class="text-gray-500 mb-6">
                    Looks like you haven't added anything to your cart yet.
                </p>


                <a
                    href="./category.html"
                    class="bg-black text-white px-8 py-3 rounded-full"
                >
                    Continue Shopping
                </a>

            </div>
        `;


        updateOrderSummary();

        return;
    }


    // =================================================
    // CART ITEMS
    // =================================================

    cartContainer.innerHTML = cart
        .map((item, index) => {

            const quantity =
                Number(item.quantity) || 1;


            const itemTotal =
                Number(item.price) *
                quantity;


            return `

                <div
                    class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 border-b pb-5 mb-5 last:border-b-0 last:mb-0 last:pb-0"
                >

                    <!-- PRODUCT -->

                    <div class="flex gap-4 min-w-0">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg bg-gray-100"
                        >


                        <div class="min-w-0">

                            <h3 class="font-bold text-lg">
                                ${item.name}
                            </h3>


                            ${
                                item.size
                                    ? `
                                        <p class="text-sm text-gray-500 mt-1">
                                            Size: ${item.size}
                                        </p>
                                    `
                                    : ""
                            }


                            ${
                                item.color
                                    ? `
                                        <p class="text-sm text-gray-500">
                                            Color:

                                            <span
                                                class="inline-block w-3 h-3 rounded-full ml-1 align-middle border"
                                                style="background-color: ${item.color};"
                                            ></span>
                                        </p>
                                    `
                                    : ""
                            }


                            <p class="font-bold text-xl mt-2">
                                ${formatPrice(item.price)}
                            </p>

                        </div>

                    </div>


                    <!-- CONTROLS -->

                    <div
                        class="flex sm:flex-col items-center sm:items-end justify-between gap-4"
                    >

                        <!-- REMOVE -->

                        <button
                            type="button"
                            class="text-red-500 hover:text-red-700 transition remove-btn"
                            data-index="${index}"
                            aria-label="Remove ${item.name}"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>


                        <!-- QUANTITY -->

                        <div
                            class="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-4"
                        >

                            <button
                                type="button"
                                class="minus text-lg font-medium"
                                data-index="${index}"
                            >
                                −
                            </button>


                            <span
                                class="qty min-w-5 text-center font-medium"
                            >
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                class="plus text-lg font-medium"
                                data-index="${index}"
                            >
                                +
                            </button>

                        </div>


                        <!-- ITEM TOTAL -->

                        <span class="font-semibold">
                            ${formatPrice(itemTotal)}
                        </span>

                    </div>

                </div>
            `;
        })
        .join("");


    // =================================================
    // PLUS BUTTONS
    // =================================================

    document
        .querySelectorAll(".plus")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);


                    const cart = getCart();


                    const currentQuantity =
                        Number(
                            cart[index]?.quantity || 0
                        );


                    updateCartQuantity(
                        index,
                        currentQuantity + 1
                    );

                }
            );

        });


    // =================================================
    // MINUS BUTTONS
    // =================================================

    document
        .querySelectorAll(".minus")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);


                    const cart = getCart();


                    const currentQuantity =
                        Number(
                            cart[index]?.quantity || 0
                        );


                    updateCartQuantity(
                        index,
                        currentQuantity - 1
                    );

                }
            );

        });


    // =================================================
    // REMOVE BUTTONS
    // =================================================

    document
        .querySelectorAll(".remove-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.index);

                    removeCartItem(index);

                }
            );

        });


    updateOrderSummary();
}


// =====================================================
// ORDER SUMMARY
// =====================================================

function updateOrderSummary() {

    const cart = getCart();


    const subtotalElement =
        document.getElementById("subtotal");


    const discountElement =
        document.getElementById("discount");


    const totalElement =
        document.getElementById("total");


    const deliveryElement =
        document.getElementById("delivery-fee");


    let subtotal = 0;


    cart.forEach((item) => {

        subtotal +=
            Number(item.price) *
            Number(item.quantity || 0);

    });


    const discount =
        subtotal * 0.20;


    const deliveryFee =
        subtotal > 0
            ? 15
            : 0;


    const total =
        subtotal -
        discount +
        deliveryFee;


    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);
    }


    if (discountElement) {

        discountElement.textContent =
            `-${formatPrice(discount)}`;
    }


    if (deliveryElement) {

        deliveryElement.textContent =
            formatPrice(deliveryFee);
    }


    if (totalElement) {

        totalElement.textContent =
            formatPrice(total);
    }
}


// =====================================================
// CART PAGE MOBILE MENU
// =====================================================
// Unique names so they don't conflict with index.js
// =====================================================

const cartMenuButton =
    document.getElementById("menu-btn");

const cartMobileMenu =
    document.getElementById("mobile-menu");


if (cartMenuButton && cartMobileMenu) {

    cartMenuButton.addEventListener("click", () => {

        const isHidden =
            cartMobileMenu.classList.contains("hidden");

        cartMobileMenu.classList.toggle("hidden");

        cartMenuButton.setAttribute(
            "aria-expanded",
            String(isHidden)
        );

    });

}


// =====================================================
// PROMO BUTTON
// =====================================================

const promoButton =
    document.getElementById("apply-promo");


if (promoButton) {

    promoButton.addEventListener(
        "click",
        () => {

            const promoInput =
                document.getElementById(
                    "promo-code"
                );


            const promoCode =
                promoInput?.value.trim();


            if (!promoCode) {

                alert(
                    "Please enter a promo code."
                );

                return;
            }


            alert(
                "Promo code feature will be added later."
            );

        }
    );
}


// =====================================================
// CHECKOUT
// =====================================================

const checkoutButton =
    document.getElementById("checkout-btn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            const cart = getCart();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            alert(
                "Checkout will be added later."
            );

        }
    );
}


// =====================================================
// INITIALIZE CART
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateCartBadge();

        renderCart();

    }
);