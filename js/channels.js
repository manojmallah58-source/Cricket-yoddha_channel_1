/* ==========================================================================
   Cricket Yoddha - Channel Section Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("allChannelsContainer");
    const searchInput = document.getElementById("channelSearchInput");
    
    const rawData = await fetchChannelData();
    if (!rawData) {
        container.innerHTML = `<div class="no-results-box"><i class="fa-solid fa-triangle-exclamation"></i><h3>Error</h3><p>Unable to connect to server.</p></div>`;
        return;
    }

    const channels = Array.isArray(rawData) ? rawData : (rawData.channels || rawData.links || []);
    renderChannelsList(channels);

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = channels.filter(ch => ch.name.toLowerCase().includes(query) || (ch.language && ch.language.toLowerCase().includes(query)));
        renderChannelsList(filtered);
    });

    initAutoRefresh((newData) => {
        const freshChannels = Array.isArray(newData) ? newData : (newData.channels || newData.links || []);
        renderChannelsList(freshChannels);
    });
});

function renderChannelsList(channels) {
    const container = document.getElementById("allChannelsContainer");
    if (!container) return;

    if (channels.length === 0) {
        container.innerHTML = `<div class="no-results-box"><i class="fa-solid fa-magnifying-glass"></i><h3>No Channels Found</h3></div>`;
        return;
    }

    container.innerHTML = channels.map(ch => `
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

function openPlayer(name, url, logo) {
    window.location.href = `player.html?name=${name}&url=${url}&logo=${logo}`;
}
