// =====================================================
// RECOMMENDED PRODUCTS
// =====================================================

const recommendedProducts = [
    {
        name: "Polo with Contrast Trims",
        image: "./asset/images/product/image 7 (1).png",
        rating: 4.0,
        price: 212,
        oldPrice: 242,
        discount: "-20%"
    },

    {
        name: "Gradient Graphic T-shirt",
        image: "./asset/images/product/image 8 (1).png",
        rating: 3.5,
        price: 145
    },

    {
        name: "Polo with Tipping Details",
        image: "./asset/images/product/image 9 (1).png",
        rating: 4.5,
        price: 180
    },

    {
        name: "Black Striped T-shirt",
        image: "./asset/images/product/image 10 (1).png",
        rating: 5.0,
        price: 120,
        oldPrice: 150,
        discount: "-30%"
    }
];


// =====================================================
// DISPLAY RECOMMENDED PRODUCTS
// =====================================================

const productContainer = document.getElementById("recommended-products");

if (productContainer) {

    recommendedProducts.forEach((product) => {

        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;

        let stars = "";

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += `<span>★</span>`;
        }

        // Half rating represented with a star
        if (hasHalfStar) {
            stars += `<span>★</span>`;
        }

        // Empty stars
        const currentStars = fullStars + (hasHalfStar ? 1 : 0);

        for (let i = currentStars; i < 5; i++) {
            stars += `<span class="text-gray-300">★</span>`;
        }

        productContainer.innerHTML += `
            <div class="min-w-0">

                <!-- Product Image -->
                <div
                    class="bg-[#f2f0f0] rounded-2xl
                           h-[180px] sm:h-[240px] md:h-[250px]
                           flex items-center justify-center
                           overflow-hidden"
                >
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="w-[80%] h-[80%] object-contain"
                    >
                </div>

                <!-- Product Name -->
                <h3 class="font-semibold text-sm sm:text-base md:text-lg mt-4">
                    ${product.name}
                </h3>

                <!-- Rating -->
                <div class="flex items-center gap-2 mt-1">

                    <div class="flex text-[#FFB21D] text-sm sm:text-base">
                        ${stars}
                    </div>

                    <span class="text-xs sm:text-sm text-gray-600">
                        ${product.rating}/5
                    </span>

                </div>

                <!-- Price -->
                <div class="flex items-center gap-2 mt-1">

                    <span class="text-lg sm:text-xl font-bold">
                        $${product.price}
                    </span>

                    ${
                        product.oldPrice
                            ? `
                                <span class="text-sm sm:text-lg text-gray-400 line-through">
                                    $${product.oldPrice}
                                </span>

                                <span
                                    class="bg-red-100 text-red-500
                                           text-[10px] sm:text-xs
                                           px-2.5 py-1 rounded-full"
                                >
                                    ${product.discount}
                                </span>
                            `
                            : ""
                    }

                </div>

            </div>
        `;
    });
}


// =====================================================
// PRODUCT IMAGE GALLERY
// =====================================================

function changeImage(imagePath, button) {

    const mainImage = document.getElementById("mainProductImage");

    if (mainImage) {
        mainImage.src = imagePath;
    }

    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail) => {

        thumbnail.classList.remove("border-black");
        thumbnail.classList.add("border-transparent");

    });

    if (button) {

        button.classList.remove("border-transparent");
        button.classList.add("border-black");

    }
}


// =====================================================
// COLOR SELECTION
// =====================================================

function selectColor(button) {

    const colorButtons = document.querySelectorAll(".color-btn");

    colorButtons.forEach((colorButton) => {

        colorButton.classList.remove(
            "ring-2",
            "ring-black",
            "border-white"
        );

        colorButton.classList.add("border-transparent");

        colorButton.innerHTML = "";

    });

    if (button) {

        button.classList.add(
            "ring-2",
            "ring-black",
            "border-white"
        );

        button.classList.remove("border-transparent");

        button.innerHTML =
            '<i class="fa-solid fa-check text-white text-[10px]"></i>';

    }
}


// =====================================================
// SIZE SELECTION
// =====================================================

function selectSize(button) {

    const sizeButtons = document.querySelectorAll(".size-btn");

    sizeButtons.forEach((sizeButton) => {

        sizeButton.classList.remove(
            "bg-black",
            "text-white"
        );

        sizeButton.classList.add(
            "bg-gray-100",
            "text-gray-600"
        );

    });

    if (button) {

        button.classList.remove(
            "bg-gray-100",
            "text-gray-600"
        );

        button.classList.add(
            "bg-black",
            "text-white"
        );

    }
}


// =====================================================
// QUANTITY
// =====================================================

function increaseQuantity() {

    const quantityElement =
        document.getElementById("quantity");

    if (!quantityElement) return;

    const currentQuantity =
        Number(quantityElement.textContent) || 1;

    quantityElement.textContent =
        String(currentQuantity + 1);
}


function decreaseQuantity() {

    const quantityElement =
        document.getElementById("quantity");

    if (!quantityElement) return;

    const currentQuantity =
        Number(quantityElement.textContent) || 1;

    quantityElement.textContent =
        String(Math.max(1, currentQuantity - 1));
}


// =====================================================
// CART COUNT
// NO LOCAL STORAGE
// =====================================================

let cartCount = 0;


function updateCartCount() {

    const cartBadge =
        document.getElementById("cart-count");

    if (!cartBadge) return;

    cartBadge.textContent =
        String(cartCount);

    if (cartCount === 0) {

        cartBadge.classList.add("hidden");

    } else {

        cartBadge.classList.remove("hidden");

    }
}


// =====================================================
// ADD TO CART
// NO LOCAL STORAGE
// =====================================================

function addToCart() {

    const quantityElement =
        document.getElementById("quantity");

    const selectedSizeButton =
        document.querySelector(".size-btn.bg-black");

    const selectedColorButton =
        document.querySelector(".color-btn.ring-2.ring-black");

    const quantity =
        Number(quantityElement?.textContent) || 1;

    const selectedSize =
        selectedSizeButton
            ? selectedSizeButton.textContent.trim()
            : "Large";

    const selectedColor =
        selectedColorButton
            ? getComputedStyle(selectedColorButton).backgroundColor
            : "rgb(81, 74, 56)";


    // Increase cart count
    cartCount += quantity;

    // Update cart badge
    updateCartCount();


    // Show confirmation
    alert(
        `${quantity} item(s) added to cart.\n\n` +
        `Size: ${selectedSize}`
    );


    console.log("Cart Item:", {
        name: "ONE LIFE GRAPHIC T-SHIRT",
        price: 260,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
    });
}


// =====================================================
// INITIAL STATE
// =====================================================

updateCartCount();


// =====================================================
// INITIAL SELECTED COLOR
// =====================================================

const initialSelectedColor =
    document.querySelector(
        ".color-btn.ring-2.ring-black"
    );

if (initialSelectedColor) {

    initialSelectedColor.innerHTML =
        '<i class="fa-solid fa-check text-white text-[10px]"></i>';

}


// =====================================================
// INITIAL SELECTED SIZE
// =====================================================

const initialSelectedSize =
    document.querySelector(".size-btn.bg-black");

if (initialSelectedSize) {

    initialSelectedSize.classList.add(
        "bg-black",
        "text-white"
    );

}