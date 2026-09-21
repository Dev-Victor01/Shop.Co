// =====================================================
// MOBILE MENU
// =====================================================

const menu = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

let cartCount = 0;

function updateCartCount() {
    const cartBadge = document.getElementById("cart-count");

    if (!cartBadge) return;

    cartBadge.textContent = cartCount;

    if (cartCount === 0) {
        cartBadge.classList.add("hidden");
    } else {
        cartBadge.classList.remove("hidden");
    }
}

function addProductToCart(productName, productPrice) {
    cartCount++;

    updateCartCount();

    (`${productName} added to cart.`);
} updateCartCount();


if (menu && mobileMenu) {

    menu.addEventListener("click", function () {

        mobileMenu.classList.toggle("hidden");

        const isOpen =
            !mobileMenu.classList.contains("hidden");

        menu.setAttribute("aria-expanded", isOpen);

        const icon = menu.querySelector("i");

        if (isOpen) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}

updateCartCount();


// =====================================================
// NEW ARRIVALS PRODUCTS
// =====================================================

const products = [

    {
        name: "T-shirt with Tape Details",
        image: "./asset/images/home/image 7-Photoroom.png",
        price: "$120",
        rating: 4.5,
        reviews: 45
    },

    {
        name: "Skinny Fit Jeans",
        image: "./asset/images/home/image 8-Photoroom.png",
        price: "$240",
        oldPrice: "$260",
        discount: "-20%",
        rating: 3.5,
        reviews: 35
    },

    {
        name: "Checkered Shirt",
        image: "./asset/images/home/image 9-Photoroom.png",
        price: "$180",
        rating: 4.5,
        reviews: 45
    },

    {
        name: "Sleeve Striped T-shirt",
        image: "./asset/images/home/image 10-Photoroom.png",
        price: "$130",
        oldPrice: "$160",
        discount: "-30%",
        rating: 4.5,
        reviews: 25
    }

];

let visibleProducts = 4;


// =====================================================
// CREATE STAR RATING
// =====================================================

function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            stars += `
                <span class="text-yellow-400">★</span>
            `;

        } else {

            stars += `
                <span class="text-gray-300">★</span>
            `;

        }

    }

    return stars;

}


// =====================================================
// DISPLAY NEW ARRIVALS
// =====================================================

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    if (!container) return;

    container.innerHTML = "";

    const productsToShow =
        products.slice(0, visibleProducts);

    productsToShow.forEach(product => {

        const productCard =
            document.createElement("div");

        productCard.className =
            "group cursor-pointer";

        productCard.innerHTML = `

            <!-- Image -->

            <div
                class="
                    bg-[#f2f2f2]
                    rounded-xl
                    h-60
                    md:h-[280px]
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                    "
                >

            </div>


            <!-- Name -->

            <h3
                class="
                    text-[15px]
                    md:text-xl
                    font-semibold
                    text-black
                    mt-2
                    truncate
                "
            >
                ${product.name}
            </h3>


            <!-- Rating -->

            <div class="flex items-center gap-1 mt-1">

                <div class="text-xl tracking-tight">
                    ${createStars(product.rating)}
                </div>

                <span class="text-sm text-gray-500">
                    ${product.rating}/5
                </span>

            </div>


            <!-- Price -->

            <div class="flex items-center gap-2 mt-1 flex-wrap">

                <span
                    class="
                        text-lg
                        md:text-xl
                        font-bold
                    "
                >
                    ${product.price}
                </span>

                ${
                    product.oldPrice
                        ? `
                            <span
                                class="
                                    text-sm
                                    md:text-lg
                                    text-gray-400
                                    line-through
                                "
                            >
                                ${product.oldPrice}
                            </span>

                            <span
                                class="
                                    text-xs
                                    font-medium
                                    text-red-500
                                    bg-red-100
                                    rounded-full
                                    px-2
                                    py-1
                                "
                            >
                                ${product.discount}
                            </span>
                        `
                        : ""
                }

            </div>

            <button
                type="button"
                class="add-to-cart-btn mt-4 w-full rounded-full bg-black text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800 transition"
                data-name="${product.name}"
                data-price="${product.price}"
            >
                Add to Cart
            </button>

        `;

        const addToCartButton = productCard.querySelector(".add-to-cart-btn");
        addToCartButton?.addEventListener("click", function () {
            addProductToCart(product.name, product.price);
        });

        container.appendChild(productCard);

    });

}


// =====================================================
// NEW ARRIVALS - VIEW ALL
// =====================================================

const viewAllBtn =
    document.getElementById("viewAllBtn");

if (viewAllBtn) {

    viewAllBtn.addEventListener("click", function () {

        if (visibleProducts < products.length) {

            visibleProducts =
                products.length;

            viewAllBtn.textContent =
                "Show Less";

        } else {

            visibleProducts = 4;

            viewAllBtn.textContent =
                "View All";

        }

        displayProducts();

    });

}


// Display products
displayProducts();


// =====================================================
// TOP SELLING PRODUCTS
// =====================================================

const topSellingProducts = [

    {
        name: "Vertical Striped Shirt",
        image: "./asset/images/home/image 7 (1)-Photoroom.png",
        price: "$212",
        oldPrice: "$232",
        discount: "-20%",
        rating: 5.0
    },

    {
        name: "Courage Graphic T-shirt",
        image: "./asset/images/home/image 8 (1)-Photoroom.png",
        price: "$145",
        rating: 4.0
    },

    {
        name: "Loose Fit Bermuda Shorts",
        image: "./asset/images/home/image 9 (1)-Photoroom.png",
        price: "$80",
        rating: 3.0
    },

    {
        name: "Faded Skinny Jeans",
        image: "./asset/images/home/image 10 (1)-Photoroom.png",
        price: "$210",
        rating: 4.5
    }

];

let topSellingVisible = 4;


// =====================================================
// TOP SELLING STARS
// =====================================================

function topSellingStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            stars += `
                <span class="text-yellow-400">★</span>
            `;

        } else {

            stars += `
                <span class="text-gray-300">★</span>
            `;

        }

    }

    return stars;

}


// =====================================================
// DISPLAY TOP SELLING
// =====================================================

function displayTopSelling() {

    const container =
        document.getElementById("topSellingContainer");

    if (!container) return;

    container.innerHTML = "";

    const productsToShow =
        topSellingProducts.slice(
            0,
            topSellingVisible
        );

    productsToShow.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "group cursor-pointer";

        card.innerHTML = `

            <!-- Product Image -->

            <div
                class="
                    bg-[#f2f0f0]
                    rounded-2xl
                    h-60
                    md:h-[280px]
                    overflow-hidden
                    flex
                    items-center
                    justify-center
                "
            >

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="
                        w-full
                        h-full
                        object-contain
                        group-hover:scale-105
                        transition
                        duration-500
                    "
                >

            </div>


            <!-- Product Name -->

            <h3
                class="
                    text-[15px]
                    md:text-xl
                    font-semibold
                    text-black
                    mt-2
                    truncate
                "
            >
                ${product.name}
            </h3>


            <!-- Rating -->

            <div class="flex items-center gap-2 mt-2">

                <div class="text-2xl">
                    ${topSellingStars(product.rating)}
                </div>

                <span class="text-sm md:text-lg text-gray-600">
                    ${product.rating}/5
                </span>

            </div>


            <!-- Price -->

            <div
                class="
                    flex
                    items-center
                    gap-2
                    mt-2
                    flex-wrap
                "
            >

                <span class="text-lg md:text-xl font-bold">
                    ${product.price}
                </span>

                ${
                    product.oldPrice
                        ? `
                            <span
                                class="
                                    text-sm
                                    md:text-base
                                    font-semibold
                                    text-gray-400
                                    line-through
                                "
                            >
                                ${product.oldPrice}
                            </span>

                            <span
                                class="
                                    text-xs
                                    text-red-500
                                    bg-red-100
                                    rounded-full
                                    px-3
                                    py-1
                                "
                            >
                                ${product.discount}
                            </span>
                        `
                        : ""
                }

            </div>

            <button
                type="button"
                class="add-to-cart-btn mt-4 w-full rounded-full bg-black text-white py-2.5 px-4 text-sm font-medium hover:bg-gray-800 transition"
                data-name="${product.name}"
                data-price="${product.price}"
            >
                Add to Cart
            </button>

        `;

        const addToCartButton = card.querySelector(".add-to-cart-btn");
        addToCartButton?.addEventListener("click", function () {
            addProductToCart(product.name, product.price);
        });

        container.appendChild(card);

    });

}


// =====================================================
// TOP SELLING - VIEW ALL
// =====================================================

const topSellingViewBtn =
    document.getElementById(
        "topSellingViewBtn"
    );

if (topSellingViewBtn) {

    topSellingViewBtn.addEventListener(
        "click",
        function () {

            if (
                topSellingVisible <
                topSellingProducts.length
            ) {

                topSellingVisible =
                    topSellingProducts.length;

                topSellingViewBtn.textContent =
                    "Show Less";

            } else {

                topSellingVisible = 4;

                topSellingViewBtn.textContent =
                    "View All";

            }

            displayTopSelling();

        }
    );

}


// Display Top Selling
displayTopSelling();


// =====================================================
// CUSTOMER TESTIMONIAL SLIDER
// =====================================================

const customerSlider =
    document.getElementById(
        "customerSlider"
    );

const customerPrev =
    document.getElementById(
        "customerPrev"
    );

const customerNext =
    document.getElementById(
        "customerNext"
    );


if (
    customerSlider &&
    customerPrev &&
    customerNext
) {

    customerNext.addEventListener(
        "click",
        function () {

            customerSlider.scrollBy({
                left: 400,
                behavior: "smooth"
            });

        }
    );


    customerPrev.addEventListener(
        "click",
        function () {

            customerSlider.scrollBy({
                left: -400,
                behavior: "smooth"
            });

        }
    );

}


// =====================================================
// NEWSLETTER
// =====================================================

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );

const newsletterEmail =
    document.getElementById(
        "newsletterEmail"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();

            if (email === "") {

                alert(
                    "Please enter your email address."
                );

                return;

            }

            alert(
                "Thank you for subscribing!"
            );

            newsletterEmail.value = "";

        }
    );

}