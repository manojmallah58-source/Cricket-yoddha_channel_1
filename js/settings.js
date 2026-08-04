/* ==========================================================================
   Cricket Yoddha - Settings Functions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const autoRefreshToggle = document.getElementById("autoRefreshToggle");

    // Load saved preferences
    const savedTheme = localStorage.getItem("cy_theme") || "dark";
    if (savedTheme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        darkModeToggle.checked = false;
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("cy_theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("cy_theme", "light");
        }
    });

    autoRefreshToggle.addEventListener("change", (e) => {
        localStorage.setItem("cy_autorefresh", e.target.checked);
    });

    // Modal Handling for Info Links
    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBodyText = document.getElementById("modalBodyText");
    const closeModalBtn = document.getElementById("closeModalBtn");

    document.getElementById("aboutModalBtn").addEventListener("click", (e) => {
        e.preventDefault();
        modalTitle.textContent = "About Cricket Yoddha";
        modalBodyText.innerHTML = `<p>Cricket Yoddha is a professional, high-performance live sports streaming web application designed to give you an immersive Android native app experience. All live streams and channel links are fetched dynamically from secure remote JSON sources.</p>`;
        modal.classList.remove("hidden");
    });

    document.getElementById("privacyModalBtn").addEventListener("click", (e) => {
        e.preventDefault();
        modalTitle.textContent = "Privacy Policy";
        modalBodyText.innerHTML = `<p>We respect your privacy. Cricket Yoddha does not store personal user data or tracking cookies. All streaming links are safely retrieved from authorized remote repositories.</p>`;
        modal.classList.remove("hidden");
    });

    document.getElementById("contactModalBtn").addEventListener("click", (e) => {
        e.preventDefault();
        modalTitle.textContent = "Contact & Support";
        modalBodyText.innerHTML = `<p>For support, channel updates, or partnership queries, reach out via our official Telegram channel or GitHub repository.</p>`;
        modal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
});
