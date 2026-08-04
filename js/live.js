/* ==========================================================================
   Cricket Yoddha - Live Match Section Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("liveGridContainer");
    const rawData = await fetchChannelData();
    
    if (!rawData) {
        container.innerHTML = `<div class="no-results-box"><i class="fa-solid fa-triangle-exclamation"></i><h3>Failed to Load</h3><p>Check your internet connection.</p></div>`;
        return;
    }

    const channels = Array.isArray(rawData) ? rawData : (rawData.channels || rawData.links || []);
    renderLiveGrid(channels);

    // Filter Chips
    const chips = document.querySelectorAll(".chip");
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            const filter = chip.getAttribute("data-filter");
            
            if (filter === "all") {
                renderLiveGrid(channels);
            } else {
                const filtered = channels.filter(ch => (ch.category && ch.category.toLowerCase().includes(filter)) || (ch.name && ch.name.toLowerCase().includes(filter)));
                renderLiveGrid(filtered.length > 0 ? filtered : channels);
            }
        });
    });

    initAutoRefresh(async (newData) => {
        const freshChannels = Array.isArray(newData) ? newData : (newData.channels || newData.links || []);
        renderLiveGrid(freshChannels);
    });
});

function renderLiveGrid(channels) {
    const container = document.getElementById("liveGridContainer");
    if (!container) return;

    if (channels.length === 0) {
        container.innerHTML = `<div class="no-results-box"><h3>No Live Matches</h3></div>`;
        return;
    }

    container.innerHTML = channels.map(ch => `
        <div class="channel-card" onclick="openPlayer('${encodeURIComponent(ch.name)}', '${encodeURIComponent(ch.url || ch.iframeSrc || '')}', '${encodeURIComponent(ch.logo || '')}')">
            <div class="ch-logo-wrap">
                <img src="${ch.logo || 'assets/default-channel.png'}" alt="${ch.name}" onerror="this.src='assets/default-channel.png'">
            </div>
            <h4>${ch.name}</h4>
            <p>${ch.language || 'HD Stream'}</p>
            <button class="watch-btn-small"><i class="fa-solid fa-play"></i> Watch Now</button>
        </div>
    `).join('');
}

function openPlayer(name, url, logo) {
    window.location.href = `player.html?name=${name}&url=${url}&logo=${logo}`;
}
