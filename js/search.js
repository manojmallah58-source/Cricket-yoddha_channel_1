/* ==========================================================================
   Cricket Yoddha - Search System
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const inputField = document.getElementById("searchInputField");
    const container = document.getElementById("searchResultsContainer");
    const noResultsBox = document.getElementById("noResultsBox");
    const quickTags = document.querySelectorAll(".search-tag");
    const clearBtn = document.getElementById("clearSearchBtn");

    const rawData = await fetchChannelData();
    const channels = rawData ? (Array.isArray(rawData) ? rawData : (rawData.channels || rawData.links || [])) : [];

    function performSearch(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            container.innerHTML = "";
            noResultsBox.classList.add("hidden");
            return;
        }

        const results = channels.filter(ch => ch.name.toLowerCase().includes(q) || (ch.language && ch.language.toLowerCase().includes(q)));

        if (results.length === 0) {
            container.innerHTML = "";
            noResultsBox.classList.remove("hidden");
        } else {
            noResultsBox.classList.add("hidden");
            container.innerHTML = results.map(ch => `
                <div class="channel-card" onclick="openPlayer('${encodeURIComponent(ch.name)}', '${encodeURIComponent(ch.url || ch.iframeSrc || '')}', '${encodeURIComponent(ch.logo || '')}')">
                    <div class="ch-logo-wrap">
                        <img src="${ch.logo || 'assets/default-channel.png'}" alt="${ch.name}" onerror="this.src='assets/default-channel.png'">
                    </div>
                    <h4>${ch.name}</h4>
                    <p>${ch.language || 'HD'}</p>
                    <button class="watch-btn-small"><i class="fa-solid fa-play"></i> Watch</button>
                </div>
            `).join('');
        }
    }

    inputField.addEventListener("input", (e) => {
        performSearch(e.target.value);
    });

    quickTags.forEach(tag => {
        tag.addEventListener("click", () => {
            const query = tag.getAttribute("data-query");
            inputField.value = query;
            performSearch(query);
        });
    });

    clearBtn.addEventListener("click", () => {
        inputField.value = "";
        container.innerHTML = "";
        noResultsBox.classList.add("hidden");
        inputField.focus();
    });
});

function openPlayer(name, url, logo) {
    window.location.href = `player.html?name=${name}&url=${url}&logo=${logo}`;
}
