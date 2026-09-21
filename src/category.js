// =====================================================
// CASUAL CATEGORY PRODUCTS
// =====================================================

const categoryProducts = [

    {
        id: "tshirt-tape",
        name: "T-shirt with Tape Details",
        image: "./asset/images/home/image 7-Photoroom.png",
        price: 120,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 45
    },

    {
        id: "gradient-graphic-tshirt",
        name: "Gradient Graphic T-shirt",
        image: "./asset/images/product/image 8 (1).png",
        price: 145,
        oldPrice: null,
        discount: null,
        rating: 3.5,
        reviews: 45
    },

    {
        id: "polo-tipping-details",
        name: "Polo with Tipping Details",
        image: "./asset/images/product/image 9 (1).png",
        price: 180,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 56
    },

    {
        id: "black-striped-tshirt",
        name: "Black Striped T-shirt",
        image: "./asset/images/product/image 10 (1).png",
        price: 120,
        oldPrice: 150,
        discount: "-30%",
        rating: 5,
        reviews: 65
    },

    {
        id: "skinny-jeans",
        name: "Skinny Fit Jeans",
        image: "./asset/images/home/image 8-Photoroom.png",
        price: 240,
        oldPrice: 260,
        discount: "-20%",
        rating: 3.5,
        reviews: 56
    },

    {
        id: "checkered-shirt",
        name: "Checkered Shirt",
        image: "./asset/images/home/image 9-Photoroom.png",
        price: 180,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 65
    },

    {
        id: "striped-tshirt",
        name: "Sleeve Striped T-shirt",
        image: "./asset/images/home/image 10-Photoroom.png",
        price: 130,
        oldPrice: 160,
        discount: "-30%",
        rating: 4.5,
        reviews: 55
    },

    {
        id: "vertical-striped-shirt",
        name: "Vertical Striped Shirt",
        image: "./asset/images/home/image 7 (1)-Photoroom.png",
        price: 212,
        oldPrice: 232,
        discount: "-20%",
        rating: 5,
        reviews: 56
    },

    {
        id: "courage-graphic-tshirt",
        name: "Courage Graphic T-shirt",
        image: "./asset/images/home/image 8 (1)-Photoroom.png",
        price: 145,
        oldPrice: null,
        discount: null,
        rating: 4,
        reviews: 56
    },

    {
        id: "bermuda-shorts",
        name: "Loose Fit Bermuda Shorts",
        image: "./asset/images/home/image 9 (1)-Photoroom.png",
        price: 80,
        oldPrice: null,
        discount: null,
        rating: 3,
        reviews: 45
    },

    {
        id: "faded-skinny-jeans",
        name: "Faded Skinny Jeans",
        image: "./asset/images/home/image 10 (1)-Photoroom.png",
        price: 210,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 42
    }
];


// =====================================================
// DOM ELEMENTS
// =====================================================

const productContainer =
    document.getElementById("productContainer");

const showingCount =
    document.getElementById("showingCount");

const sortSelect =
    document.getElementById("sortSelect");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const pagination =
    document.getElementById("pagination");

const searchInput =
    document.getElementById("searchInput");

const priceRange =
    document.getElementById("priceRange");

const priceValue =
    document.getElementById("priceValue");

const applyFilter =
    document.getElementById("applyFilter");

const menuBtn =
    document.getElementById("menu-btn");

const mobileMenu =
    document.getElementById("mobile-menu");

const cartCountElement =
    document.getElementById("cart-count");


// =====================================================
// STATE
// =====================================================

let currentPage = 1;

const productsPerPage = 9;

let filteredProducts = [...categoryProducts];

let selectedMaximumPrice = 300;


// =====================================================
// MOBILE MENU
// =====================================================

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", function () {

        const isOpen =
            !mobileMenu.classList.contains("hidden");

        mobileMenu.classList.toggle("hidden");

        menuBtn.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        const icon =
            menuBtn.querySelector("i");

        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                !isOpen
            );
        }
    });
}


// =====================================================
// CART BADGE
// cart.js owns the real cart count.
// =====================================================

if (typeof updateCartBadge === "function") {
    updateCartBadge();
}

// =====================================================
// CREATE STAR RATING
// =====================================================

function createCategoryStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (rating >= i) {

            stars += `
                <i class="fa-solid fa-star text-yellow-400"></i>
            `;

        } else if (rating >= i - 0.5) {

            stars += `
                <i class="fa-solid fa-star-half-stroke text-yellow-400"></i>
            `;

        } else {

            stars += `
                <i class="fa-regular fa-star text-gray-300"></i>
            `;
        }
    }

    return stars;
}


// =====================================================
// FILTER PRODUCTS
// =====================================================

function filterProducts() {

    const searchTerm =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    filteredProducts =
        categoryProducts.filter(function (product) {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesPrice =
                product.price <=
                selectedMaximumPrice;

            return (
                matchesSearch &&
                matchesPrice
            );
        });

    applySorting();

    currentPage = 1;

    displayCategoryProducts();
}


// =====================================================
// SORT PRODUCTS
// =====================================================

function applySorting() {

    if (!sortSelect) return;

    const sortValue =
        sortSelect.value;

    if (sortValue === "low") {

        filteredProducts.sort(
            function (a, b) {
                return a.price - b.price;
            }
        );

    } else if (sortValue === "high") {

        filteredProducts.sort(
            function (a, b) {
                return b.price - a.price;
            }
        );

    } else if (sortValue === "rating") {

        filteredProducts.sort(
            function (a, b) {
                return b.rating - a.rating;
            }
        );

    } else {

        // Restore original order
        filteredProducts =
            categoryProducts.filter(function (product) {
                return filteredProducts.includes(product);
            });

        filteredProducts.sort(
            function (a, b) {
                return (
                    categoryProducts.indexOf(a) -
                    categoryProducts.indexOf(b)
                );
            }
        );
    }
}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayCategoryProducts() {

    if (!productContainer) return;

    productContainer.innerHTML = "";

    const startIndex =
        (currentPage - 1) *
        productsPerPage;

    const endIndex =
        startIndex +
        productsPerPage;

    const productsToDisplay =
        filteredProducts.slice(
            startIndex,
            endIndex
        );


    // =================================================
    // UPDATE PRODUCT COUNT
    // =================================================

    if (showingCount) {

        showingCount.textContent =
            filteredProducts.length;
    }


    // =================================================
    // NO PRODUCTS
    // =================================================

    if (productsToDisplay.length === 0) {

        productContainer.innerHTML = `

            <div class="col-span-full py-20 text-center">

                <div class="text-5xl text-gray-300 mb-4">

                    <i class="fa-solid fa-box-open"></i>

                </div>

                <h2 class="text-xl font-semibold">
                    No products found
                </h2>

                <p class="text-gray-500 text-sm mt-2">
                    Try changing your search or filters.
                </p>

                <button
                    type="button"
                    id="clearFiltersBtn"
                    class="mt-5 bg-black text-white px-6 py-3 rounded-full text-sm hover:bg-gray-800 transition"
                >
                    Clear Filters
                </button>

            </div>
        `;

        const clearFiltersBtn =
            document.getElementById(
                "clearFiltersBtn"
            );

        if (clearFiltersBtn) {

            clearFiltersBtn.addEventListener(
                "click",
                clearFilters
            );
        }

        createCategoryPagination();

        return;
    }


    // =================================================
    // CREATE PRODUCT CARDS
    // =================================================

    productsToDisplay.forEach(
        function (product) {

            const productCard =
                document.createElement("article");

            productCard.className =
                "group cursor-pointer";


            productCard.innerHTML = `

                <!-- PRODUCT IMAGE -->

                <div class="relative overflow-hidden rounded-xl">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-image w-full aspect-square object-cover bg-[#f2f2f2] group-hover:scale-[1.02] transition duration-300"
                    >

                    <!-- ADD TO CART -->

                    <button
                        type="button"
                        class="cart-btn absolute bottom-3 right-3 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition"
                        aria-label="Add ${product.name} to cart"
                    >
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>

                </div>


                <!-- PRODUCT NAME -->

                <h2 class="font-semibold text-sm sm:text-base mt-3">
                    ${product.name}
                </h2>


                <!-- RATING -->

                <div class="flex items-center gap-2 mt-1">

                    <div class="flex gap-0.5 text-sm">

                        ${createCategoryStars(
                            product.rating
                        )}

                    </div>

                    <span class="text-xs text-gray-500">
                        ${product.rating}/5
                    </span>

                    <span class="text-xs text-gray-400">
                        (${product.reviews})
                    </span>

                </div>


                <!-- PRICE -->

                <div class="flex items-center flex-wrap gap-2 mt-1">

                    <span class="font-bold text-base sm:text-lg">
                        $${product.price}
                    </span>

                    ${
                        product.oldPrice
                            ? `
                                <span class="text-gray-400 line-through text-sm">
                                    $${product.oldPrice}
                                </span>
                            `
                            : ""
                    }

                    ${
                        product.discount
                            ? `
                                <span class="bg-red-100 text-red-500 rounded-full px-2 py-1 text-[10px]">
                                    ${product.discount}
                                </span>
                            `
                            : ""
                    }

                </div>
            `;


            // =================================================
            // IMAGE ERROR FALLBACK
            // =================================================

            const productImage =
                productCard.querySelector(
                    ".product-image"
                );

            if (productImage) {

                productImage.addEventListener(
                    "error",
                    function () {

                        this.src =
                            "https://placehold.co/500x500/f2f2f2/777?text=Product";

                    },
                    { once: true }
                );
            }


            // =================================================
            // ADD TO CART
            // =================================================

            const cartButton =
                productCard.querySelector(
                    ".cart-btn"
                );

            if (cartButton) {

                cartButton.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();

                        addProductToCart(product);

                        const originalContent =
                            cartButton.innerHTML;

                        cartButton.innerHTML =
                            `<i class="fa-solid fa-check"></i>`;

                        cartButton.classList.add(
                            "bg-green-600"
                        );

                        cartButton.classList.remove(
                            "bg-black"
                        );

                        setTimeout(
                            function () {

                                cartButton.innerHTML =
                                    originalContent;

                                cartButton.classList.remove(
                                    "bg-green-600"
                                );

                                cartButton.classList.add(
                                    "bg-black"
                                );

                            },
                            800
                        );
                    }
                );
            }


            // =================================================
            // PRODUCT DETAILS
            // =================================================

            productCard.addEventListener(
                "click",
                function () {

                    window.location.href =
                        `./product.html?id=${encodeURIComponent(
                            product.id
                        )}`;
                }
            );


            productContainer.appendChild(
                productCard
            );
        }
    );


    createCategoryPagination();
}


// =====================================================
// SEARCH
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            filterProducts();

        }
    );
}


// =====================================================
// SORT
// =====================================================

if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        function () {

            applySorting();

            currentPage = 1;

            displayCategoryProducts();

        }
    );
}


// =====================================================
// PRICE RANGE
// =====================================================

if (priceRange) {

    priceRange.addEventListener(
        "input",
        function () {

            if (priceValue) {

                priceValue.textContent =
                    `$${this.value}`;
            }
        }
    );
}


// =====================================================
// APPLY FILTER
// =====================================================

if (applyFilter) {

    applyFilter.addEventListener(
        "click",
        function () {

            if (priceRange) {

                selectedMaximumPrice =
                    Number(
                        priceRange.value
                    );
            }

            filterProducts();

        }
    );
}


// =====================================================
// CLEAR FILTERS
// =====================================================

function clearFilters() {

    if (searchInput) {
        searchInput.value = "";
    }

    if (priceRange) {
        priceRange.value = 300;
    }

    if (priceValue) {
        priceValue.textContent = "$300";
    }

    selectedMaximumPrice = 300;

    if (sortSelect) {
        sortSelect.value = "popular";
    }

    filteredProducts =
        [...categoryProducts];

    currentPage = 1;

    displayCategoryProducts();
}


// =====================================================
// PAGINATION
// =====================================================

function createCategoryPagination() {

    if (!pagination) return;

    pagination.innerHTML = "";

    const totalPages =
        Math.ceil(
            filteredProducts.length /
            productsPerPage
        );


    // =================================================
    // NO PAGES
    // =================================================

    if (totalPages === 0) {

        if (previousBtn) {

            previousBtn.disabled = true;

            previousBtn.classList.add(
                "opacity-40"
            );
        }

        if (nextBtn) {

            nextBtn.disabled = true;

            nextBtn.classList.add(
                "opacity-40"
            );
        }

        return;
    }


    // =================================================
    // PAGE BUTTONS
    // =================================================

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent = i;

        button.className = `
            w-8
            h-8
            rounded-lg
            text-sm
            transition
            ${
                i === currentPage
                    ? "bg-black text-white"
                    : "text-gray-500 hover:bg-gray-100"
            }
        `;

        button.addEventListener(
            "click",
            function () {

                currentPage = i;

                displayCategoryProducts();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

        pagination.appendChild(
            button
        );
    }


    // =================================================
    // PREVIOUS
    // =================================================

    if (previousBtn) {

        const isFirstPage =
            currentPage === 1;

        previousBtn.disabled =
            isFirstPage;

        previousBtn.classList.toggle(
            "opacity-40",
            isFirstPage
        );

        previousBtn.classList.toggle(
            "cursor-not-allowed",
            isFirstPage
        );
    }


    // =================================================
    // NEXT
    // =================================================

    if (nextBtn) {

        const isLastPage =
            currentPage === totalPages;

        nextBtn.disabled =
            isLastPage;

        nextBtn.classList.toggle(
            "opacity-40",
            isLastPage
        );

        nextBtn.classList.toggle(
            "cursor-not-allowed",
            isLastPage
        );
    }
}


// =====================================================
// PREVIOUS PAGE
// =====================================================

if (previousBtn) {

    previousBtn.addEventListener(
        "click",
        function () {

            if (currentPage > 1) {

                currentPage--;

                displayCategoryProducts();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }
    );
}


// =====================================================
// NEXT PAGE
// =====================================================

if (nextBtn) {

    nextBtn.addEventListener(
        "click",
        function () {

            const totalPages =
                Math.ceil(
                    filteredProducts.length /
                    productsPerPage
                );

            if (currentPage < totalPages) {

                currentPage++;

                displayCategoryProducts();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }
    );
}


// =====================================================
// INITIAL SEARCH QUERY
// =====================================================

const initialSearchParams =
    new URLSearchParams(window.location.search);

const initialSearchTerm =
    initialSearchParams.get("search");

if (searchInput && initialSearchTerm) {
    searchInput.value = initialSearchTerm;
    filterProducts();
}

// =====================================================
// INITIALIZE
// =====================================================

if (typeof updateCartBadge === "function") {
    updateCartBadge();
}

displayCategoryProducts();

