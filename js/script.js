// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const closeMenu = document.querySelector(".close-menu");
const lightIcons = document.querySelectorAll("#light, #light-menu");
const navLinks = document.querySelectorAll(".navbar-nav a:not(.menu-header a)"); // Get all nav links except menu header

// Theme toggle function
function toggleTheme() {
    const html = document.documentElement;
    const isLight = html.getAttribute("data-theme") === "light";

    // Toggle theme
    if (isLight) {
        html.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
    } else {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }

    // Update icons
    updateThemeIcons();
}

// Update theme icons based on current theme
function updateThemeIcons() {
    const isLight =
        document.documentElement.getAttribute("data-theme") === "light";
    lightIcons.forEach((icon) => {
        // Replace the inner HTML with appropriate icon
        icon.innerHTML = isLight
            ? '<i data-feather="moon"></i>'
            : '<i data-feather="sun"></i>';
    });
    // Refresh feather icons
    feather.replace();
}

// Function to close mobile menu
function closeMobileMenu() {
    navbarNav.classList.remove("active");
}

// Hamburger menu click
hamburgerMenu.onclick = (e) => {
    e.preventDefault();
    navbarNav.classList.toggle("active"); // Changed from add to toggle
};

// Close menu click
closeMenu.onclick = (e) => {
    e.preventDefault();
    closeMobileMenu();
};

// Close menu when clicking on any nav link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

// Click outside to close menu
document.addEventListener("click", function (e) {
    if (
        !hamburgerMenu.contains(e.target) &&
        !navbarNav.contains(e.target) &&
        navbarNav.classList.contains("active")
    ) {
        closeMobileMenu();
    }
});

// Light theme toggle for all sun/moon icons
lightIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
        e.preventDefault();
        toggleTheme();
    });
});

// Check for saved theme preference on load
document.addEventListener("DOMContentLoaded", function () {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
    }
    // Initialize icons
    updateThemeIcons();

    // Add scroll padding to account for fixed navbar
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    document.documentElement.style.scrollPaddingTop = `${navbarHeight}px`;
});
