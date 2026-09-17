/* =========================================================
   FITFORGE
   PORTFOLIO WEBSITE CONCEPT
========================================================= */


/* =========================================================
   CONTACT SETTINGS
========================================================= */

const CONTACT = {

    /*
        WhatsApp number.

        IMPORTANT:
        Use country code without + or spaces.

        Example:
        UAE: 971501234567
    */

    whatsapp: "971558311047",

    email: "hakimwebsites.ug@gmail.com",

    whatsappMessage:
        "Hi! I found your portfolio and I'd like to discuss a website project."

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuToggle && navLinks) {

        const navItems =
            navLinks.querySelectorAll("a");


        function openMenu() {

            navLinks.classList.add("open");

            menuToggle.classList.add("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add("menu-open");

        }


        function closeMenu() {

            navLinks.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.classList.remove("menu-open");

        }


        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.contains("open");

                if (isOpen) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        /*
            Close mobile menu when a navigation
            link is selected.
        */

        navItems.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });


        /*
            Close menu when the Escape key is pressed.
        */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    navLinks.classList.contains("open")
                ) {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /*
            Close the mobile menu if the browser
            becomes wider than the mobile breakpoint.
        */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 700 &&
                    navLinks.classList.contains("open")
                ) {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    /*
        If IntersectionObserver isn't supported,
        show everything immediately.
    */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );


    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const currentId =
                                entry.target.getAttribute(
                                    "id"
                                );


                            navigationLinks.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${currentId}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       WHATSAPP BUTTON
    ====================================================== */

    const whatsappButton =
        document.querySelector(
            '[data-contact="whatsapp"]'
        );


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


                /*
                    Check that a real number has
                    been entered.
                */

                if (
                    !CONTACT.whatsapp ||
                    CONTACT.whatsapp ===
                    "YOUR_WHATSAPP_NUMBER"
                ) {

                    alert(
                        "WhatsApp contact is not configured yet."
                    );

                    return;

                }


                const cleanNumber =
                    CONTACT.whatsapp
                        .replace(/\D/g, "");


                if (!cleanNumber) {

                    alert(
                        "Please check the WhatsApp number in script.js."
                    );

                    return;

                }


                const message =
                    encodeURIComponent(
                        CONTACT.whatsappMessage
                    );


                const whatsappURL =
                    `https://wa.me/${cleanNumber}?text=${message}`;


                /*
                    Open WhatsApp in a new tab/window.
                */

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* =====================================================
       EMAIL CONTACT
    ====================================================== */

    const emailButtons =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailButtons.forEach(button => {

        /*
            Keep the HTML email link working normally.
            This section only ensures the configured
            email is used consistently.
        */

        if (CONTACT.email) {

            button.setAttribute(
                "href",
                `mailto:${CONTACT.email}`
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                    Prevent the same error handler
                    from running repeatedly.
                */

                if (
                    image.dataset.fallbackApplied ===
                    "true"
                ) {

                    return;

                }


                image.dataset.fallbackApplied =
                    "true";


                image.style.display = "none";


                if (image.parentElement) {

                    image.parentElement.classList.add(
                        "image-missing"
                    );

                }

            }
        );


        /*
            Handle images that may already be
            broken before JavaScript loads.
        */

        if (
            image.complete &&
            image.naturalWidth === 0
        ) {

            image.dispatchEvent(
                new Event("error")
            );

        }

    });


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ====================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );


    anchorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


});