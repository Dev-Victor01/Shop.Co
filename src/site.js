// =====================================================
// SHOP.CO SHARED SITE FUNCTIONS
// Search + Newsletter + shared navigation
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // SEARCH
    // =================================================

    const searchInputs = document.querySelectorAll(
        'input[type="search"]'
    );

    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase();

    const isCategoryPage =
        currentPage === "category.html" ||
        currentPage === "category(1).html";

    searchInputs.forEach((input) => {

        // Allow Enter to search from every page.
        input.addEventListener("keydown", (event) => {

            if (event.key !== "Enter") {
                return;
            }

            const searchTerm =
                input.value.trim();

            if (!searchTerm) {
                return;
            }

            // Category page already filters live.
            if (isCategoryPage) {
                return;
            }

            window.location.href =
                `./category.html?search=${encodeURIComponent(searchTerm)}`;
        });
    });


    // =================================================
    // NEWSLETTER
    // =================================================

    const newsletterForms =
        document.querySelectorAll("#newsletterForm");

    newsletterForms.forEach((form) => {

        // Prevent the same form from being connected twice.
        if (form.dataset.newsletterReady === "true") {
            return;
        }

        form.dataset.newsletterReady = "true";

        const emailInput =
            form.querySelector("#newsletterEmail");

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const email =
                emailInput?.value.trim().toLowerCase();

            if (!email) {
                showNewsletterMessage(
                    form,
                    "Please enter your email address.",
                    false
                );
                return;
            }

            // HTML type="email" handles normal browser validation,
            // but this keeps the JavaScript validation reliable too.
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showNewsletterMessage(
                    form,
                    "Please enter a valid email address.",
                    false
                );
                return;
            }

            const subscribers =
                JSON.parse(
                    localStorage.getItem("shopco_newsletter_subscribers") || "[]"
                );

            if (!subscribers.includes(email)) {
                subscribers.push(email);

                localStorage.setItem(
                    "shopco_newsletter_subscribers",
                    JSON.stringify(subscribers)
                );
            }

            showNewsletterMessage(
                form,
                "Thanks for subscribing! 🎉",
                true
            );

            form.reset();
        });
    });


    // =================================================
    // SHARED NAVIGATION
    // =================================================

    document
        .querySelectorAll('[data-nav="shop"]')
        .forEach((link) => {
            link.href = "./category.html";
        });

    document
        .querySelectorAll('[data-nav="home"]')
        .forEach((link) => {
            link.href = "./index.html";
        });

    document
        .querySelectorAll('[data-nav="cart"]')
        .forEach((link) => {
            link.href = "./cart.html";
        });
});


// =====================================================
// NEWSLETTER MESSAGE
// =====================================================

function showNewsletterMessage(
    form,
    message,
    success
) {

    let messageElement =
        form.querySelector(".newsletter-message");

    if (!messageElement) {

        messageElement =
            document.createElement("p");

        messageElement.className =
            "newsletter-message text-sm text-center mt-1";

        form.appendChild(messageElement);
    }

    messageElement.textContent = message;

    messageElement.classList.toggle(
        "text-green-500",
        success
    );

    messageElement.classList.toggle(
        "text-red-500",
        !success
    );

    clearTimeout(
        form.newsletterMessageTimer
    );

    form.newsletterMessageTimer =
        setTimeout(() => {

            messageElement.textContent = "";

        }, 3500);
}
