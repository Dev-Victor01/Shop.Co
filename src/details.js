// =====================================================
// PRODUCT DATA
// =====================================================

const products = [
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
            "A stylish everyday t-shirt with tape details, designed for comfort and a modern casual look.",
        colors: ["#514a38", "#315550", "#303451"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "A modern pair of skinny fit jeans designed for a clean, comfortable and stylish everyday look.",
        colors: ["#303451", "#000000", "#315550"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "A classic checkered shirt that combines comfort and everyday style.",
        colors: ["#ffffff", "#000000", "#514a38"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "A comfortable striped t-shirt made for everyday outfits and casual occasions.",
        colors: ["#315550", "#000000", "#ffffff"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },

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
            "A stylish vertical striped shirt with a clean and modern design.",
        colors: ["#ffffff", "#303451", "#000000"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "A bold graphic t-shirt designed for a relaxed and confident everyday look.",
        colors: ["#000000", "#ffffff", "#514a38"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "Comfortable loose-fit Bermuda shorts perfect for casual everyday wear.",
        colors: ["#000000", "#303451", "#514a38"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
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
            "Modern faded skinny jeans with a comfortable fit and stylish finish.",
        colors: ["#303451", "#000000", "#315550"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },

    {
        id: "gradient-graphic-tshirt",
        name: "Gradient Graphic T-shirt",
        image: "./asset/images/product/image 8 (1).png",
        price: 145,
        oldPrice: null,
        discount: null,
        rating: 3.5,
        reviews: 45,
        description:
            "A stylish gradient graphic t-shirt made from soft and breathable fabric. Perfect for casual everyday wear.",
        colors: ["#514a38", "#315550", "#303451"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },

    {
        id: "polo-tipping-details",
        name: "Polo with Tipping Details",
        image: "./asset/images/product/image 9 (1).png",
        price: 180,
        oldPrice: null,
        discount: null,
        rating: 4.5,
        reviews: 56,
        description:
            "A classic polo shirt featuring stylish tipping details and a comfortable fit for everyday occasions.",
        colors: ["#000000", "#ffffff", "#303451"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },

    {
        id: "black-striped-tshirt",
        name: "Black Striped T-shirt",
        image: "./asset/images/product/image 10 (1).png",
        price: 120,
        oldPrice: 150,
        discount: "-30%",
        rating: 5,
        reviews: 65,
        description:
            "A clean black striped t-shirt designed for a modern casual look. Comfortable, simple and easy to style.",
        colors: ["#000000", "#ffffff"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    }
];


// =====================================================
// GET PRODUCT FROM URL
// =====================================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products.find(
    item => String(item.id) === String(productId)
);


// =====================================================
// PRODUCT NOT FOUND
// =====================================================

if (!product) {
    document.body.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center px-5">
            <h1 class="text-3xl font-bold mb-4">
                Product Not Found
            </h1>

            <p class="text-gray-500 mb-6">
                The product you are looking for does not exist.
            </p>

            <a
                href="./index.html"
                class="bg-black text-white px-6 py-3 rounded-full"
            >
                Back to Shop
            </a>
        </div>
    `;

    throw new Error("Product not found");
}


// =====================================================
// QUANTITY
// =====================================================

let quantity = 1;


// =====================================================
// DOM ELEMENTS
// =====================================================

const titleElement =
    document.getElementById("product-title");

const mainImage =
    document.getElementById("mainProductImage");

const priceElement =
    document.getElementById("product-price");

const oldPriceElement =
    document.getElementById("product-old-price");

const discountElement =
    document.getElementById("product-discount");

const descriptionElement =
    document.getElementById("product-description");

const ratingElement =
    document.getElementById("product-rating");

const ratingNumberElement =
    document.getElementById("product-rating-number");

const quantityElement =
    document.getElementById("quantity");

const thumbnailContainer =
    document.getElementById("thumbnailContainer");

const colorContainer =
    document.getElementById("color-container");

const sizeContainer =
    document.getElementById("size-container");


// =====================================================
// DISPLAY PRODUCT
// =====================================================

function displayProduct() {

    if (titleElement) {
        titleElement.textContent = product.name;
    }

    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }

    if (priceElement) {
        priceElement.textContent = `$${product.price}`;
    }

    if (oldPriceElement) {

        if (product.oldPrice) {
            oldPriceElement.textContent = `$${product.oldPrice}`;
            oldPriceElement.classList.remove("hidden");
        } else {
            oldPriceElement.textContent = "";
            oldPriceElement.classList.add("hidden");
        }
    }

    if (discountElement) {

        if (product.discount) {
            discountElement.textContent = product.discount;
            discountElement.classList.remove("hidden");
        } else {
            discountElement.textContent = "";
            discountElement.classList.add("hidden");
        }
    }

    if (descriptionElement) {
        descriptionElement.textContent = product.description;
    }

    if (ratingElement) {
        ratingElement.innerHTML =
            generateStars(product.rating);
    }

    if (ratingNumberElement) {
        ratingNumberElement.textContent =
            `${product.rating}/5`;
    }

    quantity = 1;

    if (quantityElement) {
        quantityElement.textContent = "1";
    }

    displayProductImages();
    displayColors();
    displaySizes();
}


// =====================================================
// GENERATE STARS
// =====================================================

function generateStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        stars += `
            <span class="${
                rating >= i
                    ? "text-[#FFB21D]"
                    : "text-gray-300"
            }">
                ★
            </span>
        `;
    }

    return stars;
}


// =====================================================
// PRODUCT IMAGES
// =====================================================

function displayProductImages() {

    if (!thumbnailContainer || !mainImage) {
        return;
    }

    thumbnailContainer.innerHTML = "";

    const images =
        product.images && product.images.length
            ? product.images
            : [product.image];

    images.forEach((image, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = `
            thumbnail
            border-2
            ${index === 0
                ? "border-black"
                : "border-transparent"}
            bg-gray-100
            rounded-2xl
            overflow-hidden
            w-24
            h-24
            md:w-32
            md:h-32
            shrink-0
        `;

        button.innerHTML = `
            <img
                src="${image}"
                alt="${product.name}"
                class="w-full h-full object-contain"
            >
        `;

        button.addEventListener("click", function () {
            changeImage(image, button);
        });

        thumbnailContainer.appendChild(button);
    });

    mainImage.src = images[0];
}


// =====================================================
// CHANGE IMAGE
// =====================================================

function changeImage(image, button) {

    if (!mainImage) return;

    mainImage.src = image;

    document
        .querySelectorAll(".thumbnail")
        .forEach(thumbnail => {

            thumbnail.classList.remove("border-black");

            thumbnail.classList.add(
                "border-transparent"
            );
        });

    button.classList.remove("border-transparent");

    button.classList.add("border-black");
}


// =====================================================
// DISPLAY COLORS
// =====================================================

function displayColors() {

    if (!colorContainer) return;

    colorContainer.innerHTML = "";

    const colors = product.colors || [];

    colors.forEach((color, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className = `
            color-btn
            w-8
            h-8
            rounded-full
            border-2
            ${
                index === 0
                    ? "border-white ring-2 ring-black"
                    : "border-transparent"
            }
        `;

        button.style.backgroundColor = color;

        if (index === 0) {
            button.innerHTML = `
                <i class="fa-solid fa-check text-white text-[10px]"></i>
            `;
        }

        button.addEventListener("click", function () {
            selectColor(button);
        });

        colorContainer.appendChild(button);
    });
}


// =====================================================
// SELECT COLOR
// =====================================================

function selectColor(button) {

    document
        .querySelectorAll(".color-btn")
        .forEach(colorButton => {

            colorButton.classList.remove(
                "ring-2",
                "ring-black",
                "border-white"
            );

            colorButton.classList.add(
                "border-transparent"
            );

            colorButton.innerHTML = "";
        });

    button.classList.remove("border-transparent");

    button.classList.add(
        "border-white",
        "ring-2",
        "ring-black"
    );

    button.innerHTML = `
        <i class="fa-solid fa-check text-white text-[10px]"></i>
    `;
}


// =====================================================
// DISPLAY SIZES
// =====================================================

function displaySizes() {

    if (!sizeContainer) return;

    sizeContainer.innerHTML = "";

    const sizes =
        product.sizes || [
            "Small",
            "Medium",
            "Large",
            "X-Large"
        ];

    sizes.forEach((size, index) => {

        const button =
            document.createElement("button");

        button.type = "button";

        button.textContent = size;

        button.className = `
            size-btn
            px-6
            py-3
            rounded-full
            text-sm
            ${
                index === 2
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
            }
        `;

        button.addEventListener("click", function () {
            selectSize(button);
        });

        sizeContainer.appendChild(button);
    });
}


// =====================================================
// SELECT SIZE
// =====================================================

function selectSize(button) {

    document
        .querySelectorAll(".size-btn")
        .forEach(sizeButton => {

            sizeButton.classList.remove(
                "bg-black",
                "text-white"
            );

            sizeButton.classList.add(
                "bg-gray-100",
                "text-gray-600"
            );
        });

    button.classList.remove(
        "bg-gray-100",
        "text-gray-600"
    );

    button.classList.add(
        "bg-black",
        "text-white"
    );
}


// =====================================================
// QUANTITY CONTROLS
// =====================================================

function increaseQuantity() {

    quantity++;

    if (quantityElement) {
        quantityElement.textContent = quantity;
    }
}


function decreaseQuantity() {

    if (quantity <= 1) {
        return;
    }

    quantity--;

    if (quantityElement) {
        quantityElement.textContent = quantity;
    }
}


// =====================================================
// GET SELECTED SIZE
// =====================================================

function getSelectedSize() {

    const selectedSizeButton =
        document.querySelector(".size-btn.bg-black");

    return selectedSizeButton
        ? selectedSizeButton.textContent.trim()
        : "";
}


// =====================================================
// GET SELECTED COLOR
// =====================================================

function getSelectedColor() {

    const selectedColorButton =
        document.querySelector(".color-btn.ring-black");

    return selectedColorButton
        ? selectedColorButton.style.backgroundColor
        : "";
}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart() {

    // Make sure cart.js is loaded
    if (typeof addProductToCart !== "function") {

        console.error(
            "addProductToCart() is not available. Make sure cart.js is loaded before details.js."
        );

        alert(
            "Cart system is not available. Please refresh the page."
        );

        return;
    }


    const selectedSize =
        getSelectedSize();

    const selectedColor =
        getSelectedColor();


    addProductToCart(
        product,
        quantity,
        {
            size: selectedSize,
            color: selectedColor
        }
    );


    alert(
        `${quantity} item(s) added to cart.\n\n` +
        `Product: ${product.name}\n` +
        `Size: ${selectedSize || "Not selected"}`
    );
}


// =====================================================
// RECOMMENDED PRODUCTS
// =====================================================

function displayRecommendedProducts() {

    const container =
        document.getElementById(
            "recommended-products"
        );

    if (!container) return;

    const recommendations =
        products
            .filter(item =>
                String(item.id) !== String(product.id)
            )
            .slice(0, 4);

    container.innerHTML = "";

    recommendations.forEach(item => {

        const card =
            document.createElement("a");

        card.href =
            `./product.html?id=${encodeURIComponent(item.id)}`;

        card.className =
            "min-w-0 block";

        card.innerHTML = `
            <div
                class="bg-[#f2f0f0]
                       rounded-2xl
                       h-[180px]
                       sm:h-[240px]
                       md:h-[250px]
                       flex
                       items-center
                       justify-center
                       overflow-hidden"
            >
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-[80%] h-[80%] object-contain"
                >
            </div>

            <h3
                class="font-semibold
                       text-sm
                       sm:text-base
                       md:text-lg
                       mt-4"
            >
                ${item.name}
            </h3>

            <div class="flex items-center gap-2 mt-1">

                <div class="flex text-[#FFB21D] text-sm">
                    ${generateStars(item.rating)}
                </div>

                <span class="text-xs sm:text-sm text-gray-600">
                    ${item.rating}/5
                </span>

            </div>

            <div class="flex items-center gap-2 mt-1">

                <span class="text-lg sm:text-xl font-bold">
                    $${item.price}
                </span>

                ${
                    item.oldPrice
                        ? `
                            <span class="text-sm sm:text-lg text-gray-400 line-through">
                                $${item.oldPrice}
                            </span>

                            <span class="bg-red-100 text-red-500 text-[10px] sm:text-xs px-2.5 py-1 rounded-full">
                                ${item.discount}
                            </span>
                        `
                        : ""
                }

            </div>
        `;

        container.appendChild(card);
    });
}


// =====================================================
// INITIALIZE
// =====================================================

displayProduct();

displayRecommendedProducts();