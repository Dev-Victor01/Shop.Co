// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");

        const isOpen = !mobileMenu.classList.contains("hidden");

        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        menuBtn.setAttribute("aria-expanded", isOpen);
    });
}


// =====================================================
// PRODUCT DATA
// =====================================================

const newArrivals = [
    {
        id: "tshirt-tape",
        name: "T-shirt with Tape Details",
        image: "./asset/images/home/image 7-Photoroom.png",
        price: 120,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 45,
        description:
            "A stylish everyday t-shirt with tape details, designed for comfort and a modern casual look."
    },

    {
        id: "skinny-jeans",
        name: "Skinny Fit Jeans",
        image: "./asset/images/home/image 8-Photoroom.png",
        price: 240,
        oldPrice: 260,
        discount: "-20%",
        rating: 3.5,
        reviews: 35,
        description:
            "A modern pair of skinny fit jeans designed for a clean, comfortable and stylish everyday look."
    },

    {
        id: "checkered-shirt",
        name: "Checkered Shirt",
        image: "./asset/images/home/image 9-Photoroom.png",
        price: 180,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 45,
        description:
            "A classic checkered shirt that combines comfort and everyday style."
    },

    {
        id: "striped-tshirt",
        name: "Sleeve Striped T-shirt",
        image: "./asset/images/home/image 10-Photoroom.png",
        price: 130,
        oldPrice: 160,
        discount: "-30%",
        rating: 4.5,
        reviews: 25,
        description:
            "A comfortable striped t-shirt made for everyday outfits and casual occasions."
    }
];


// =====================================================
// TOP SELLING
// =====================================================

const topSelling = [
    {
        id: "vertical-striped-shirt",
        name: "Vertical Striped Shirt",
        image: "./asset/images/home/image 7 (1)-Photoroom.png",
        price: 212,
        oldPrice: 232,
        discount: "-20%",
        rating: 5,
        reviews: 42,
        description:
            "A stylish vertical striped shirt with a clean and modern design."
    },

    {
        id: "courage-graphic-tshirt",
        name: "Courage Graphic T-shirt",
        image: "./asset/images/home/image 8 (1)-Photoroom.png",
        price: 145,
        oldPrice: null,
        discount: null,
        rating: 4,
        reviews: 38,
        description:
            "A bold graphic t-shirt designed for a relaxed and confident everyday look."
    },

    {
        id: "bermuda-shorts",
        name: "Loose Fit Bermuda Shorts",
        image: "./asset/images/home/image 9 (1)-Photoroom.png",
        price: 80,
        oldPrice: null,
        discount: null,
        rating: 3,
        reviews: 27,
        description:
            "Comfortable loose-fit Bermuda shorts perfect for casual everyday wear."
    },

    {
        id: "faded-skinny-jeans",
        name: "Faded Skinny Jeans",
        image: "./asset/images/home/image 10 (1)-Photoroom.png",
        price: 210,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 51,
        description:
            "Modern faded skinny jeans with a comfortable fit and stylish finish."
    }
];


// =====================================================
// CREATE STARS
// =====================================================

function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {

            stars += '<i class="fa-solid fa-star"></i>';

        } else if (rating >= i - 0.5) {

            stars += '<i class="fa-solid fa-star-half-stroke"></i>';

        } else {

            stars += '<i class="fa-regular fa-star"></i>';
        }
    }

    return stars;
}


// =====================================================
// PRODUCT CARD
// =====================================================

function createProductCard(product) {

    return `
        <article class="group">

            <!-- Product Image -->
            <div class="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">

                <a
                    href="./product.html?id=${encodeURIComponent(product.id)}"
                    class="block w-full h-full"
                >

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    >

                </a>

                ${
                    product.discount
                        ? `
                            <span
                                class="absolute top-3 right-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium"
                            >
                                ${product.discount}
                            </span>
                        `
                        : ""
                }

            </div>


            <!-- Product Name -->
            <a
                href="./product.html?id=${encodeURIComponent(product.id)}"
                class="block mt-4 font-bold text-sm sm:text-base hover:underline"
            >
                ${product.name}
            </a>


            <!-- Rating -->
            <div class="flex items-center gap-2 mt-2">

                <div class="flex gap-1 text-yellow-400 text-sm">
                    ${createStars(product.rating)}
                </div>

                <span class="text-xs text-gray-500">
                    ${product.rating}/5
                </span>

            </div>


            <!-- Price -->
            <div class="flex items-center gap-2 mt-2 flex-wrap">

                <span class="font-bold text-lg">
                    $${product.price}
                </span>

                ${
                    product.oldPrice
                        ? `
                            <span class="text-gray-400 line-through">
                                $${product.oldPrice}
                            </span>
                        `
                        : ""
                }

            </div>


            <!-- Add To Cart -->
            <button
                type="button"
                class="add-to-cart-btn mt-4 w-full rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                data-product-id="${product.id}"
            >
                Add to Cart
            </button>

        </article>
    `;
}


// =====================================================
// ADD TO CART BUTTONS
// =====================================================

function setupAddToCartButtons() {

    const buttons = document.querySelectorAll(".add-to-cart-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const productId = this.dataset.productId;

            const allProducts = [
                ...newArrivals,
                ...topSelling
            ];

            const product = allProducts.find(
                (item) => item.id === productId
            );

            if (!product) {
                console.error(
                    "Product not found:",
                    productId
                );

                return;
            }


            // Check that cart.js is loaded
            if (typeof addProductToCart !== "function") {

                console.error(
                    "cart.js is not loaded. Load cart.js before index.js."
                );

                return;
            }


            // Add product
            addProductToCart(product, 1);


            // Update cart badge
            if (typeof updateCartBadge === "function") {
                updateCartBadge();
            }


            alert(
                `${product.name} added to cart.`
            );
        });
    });
}


// =====================================================
// NEW ARRIVALS
// =====================================================

const productContainer =
    document.getElementById("productContainer");

const viewAllBtn =
    document.getElementById("viewAllBtn");

let showAllProducts = false;


function displayNewArrivals() {

    if (!productContainer) {
        return;
    }

    const productsToShow = showAllProducts
        ? newArrivals
        : newArrivals.slice(0, 4);


    productContainer.innerHTML =
        productsToShow
            .map(createProductCard)
            .join("");


    setupAddToCartButtons();


    if (viewAllBtn) {

        viewAllBtn.textContent =
            showAllProducts
                ? "Show Less"
                : "View All";
    }
}


displayNewArrivals();


if (viewAllBtn) {

    viewAllBtn.addEventListener("click", () => {

        showAllProducts =
            !showAllProducts;

        displayNewArrivals();
    });
}


// =====================================================
// TOP SELLING
// =====================================================

const topSellingContainer =
    document.getElementById("topSellingContainer");

const topSellingViewBtn =
    document.getElementById("topSellingViewBtn");

let showAllTopSelling = false;


function displayTopSelling() {

    if (!topSellingContainer) {
        return;
    }

    const productsToShow =
        showAllTopSelling
            ? topSelling
            : topSelling.slice(0, 4);


    topSellingContainer.innerHTML =
        productsToShow
            .map(createProductCard)
            .join("");


    setupAddToCartButtons();


    if (topSellingViewBtn) {

        topSellingViewBtn.textContent =
            showAllTopSelling
                ? "Show Less"
                : "View All";
    }
}


displayTopSelling();


if (topSellingViewBtn) {

    topSellingViewBtn.addEventListener("click", () => {

        showAllTopSelling =
            !showAllTopSelling;

        displayTopSelling();
    });
}


// =====================================================
// CUSTOMER SLIDER
// =====================================================

const customerSlider =
    document.getElementById("customerSlider");

const customerPrev =
    document.getElementById("customerPrev");

const customerNext =
    document.getElementById("customerNext");


if (customerPrev && customerSlider) {

    customerPrev.addEventListener("click", () => {

        customerSlider.scrollBy({
            left: -400,
            behavior: "smooth"
        });

    });
}


if (customerNext && customerSlider) {

    customerNext.addEventListener("click", () => {

        customerSlider.scrollBy({
            left: 400,
            behavior: "smooth"
        });

    });
}
