/* =========================================================
   FITFORGE
   PORTFOLIO WEBSITE CONCEPT
========================================================= */


/* =========================================================
   CONTACT SETTINGS
========================================================= */

const CONTACT = {

    // Replace with your WhatsApp number.
    // Include country code.
    // Example: "971501234567"
    whatsapp: "971558311047",

    // Replace with your real email.
    email: "hakimwebsites.ug@gmail.com",

    // Default WhatsApp message
    whatsappMessage:
        "Hi! I found your portfolio and I'd like to discuss a website project."

};


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    // Close menu when a navigation link is clicked

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navigationLinks.forEach(link => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                }

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================================================
   WHATSAPP BUTTON
========================================================= */

const whatsappButton =
    document.querySelector(
        '[data-contact="whatsapp"]'
    );

if (whatsappButton) {

    whatsappButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            if (
                !CONTACT.whatsapp ||
                CONTACT.whatsapp ===
                "YOUR_WHATSAPP_NUMBER"
            ) {

                alert(
                    "Please add your WhatsApp number in script.js first."
                );

                return;
            }

            const message =
                encodeURIComponent(
                    CONTACT.whatsappMessage
                );

            const whatsappURL =
                `https://wa.me/${CONTACT.whatsapp}?text=${message}`;

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}




/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

const images =
    document.querySelectorAll("img");

images.forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.display = "none";

            image.parentElement.classList.add(
                "image-missing"
            );

        }
    );

});