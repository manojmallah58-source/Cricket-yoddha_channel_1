/* ==========================================================================
   Cricket Yoddha - Main Website Functions (Home Page Logic)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    // Load dynamic data on home page
    await loadHomeData();

    // Setup auto-refresh every 60 seconds
    initAutoRefresh(async () => {
        await loadHomeData();
    });

    // Notification button handler
    const notificationBtn = document.getElementById("notificationBtn");
    if (notificationBtn) {
        notificationBtn.addEventListener("click", () => {
            alert("No new match notifications right now. Stay tuned!");
        });
    }
});

async function loadHomeData() {
    const rawData = await fetchChannelData();
    if (!rawData) return;

    // Normalize data structure (support array or object with channels key)
    const channels = Array.isArray(rawData) ? rawData : (rawData.channels || rawData.links || []);

    renderLiveMatches(channels);
    renderPopularChannels(channels);
    renderTrendingStreams(channels);
}

function renderLiveMatches(channels) {
    const container = document.getElementById("liveMatchesContainer");
    if (!container) return;

    // Filter channels marked as live or active
    const liveItems = channels.filter(ch => ch.isLive || ch.category === "live" || true); // fallback to all if flags missing

    if (liveItems.length === 0) {
        container.innerHTML = `<p class="text-secondary" style="padding: 10px;">No live matches currently available.</p>`;
        return;
    }

    container.innerHTML = liveItems.slice(0, 6).map(ch => `
        <div class="channel-card" onclick="openPlayer('${encodeURIComponent(ch.name)}', '${encodeURIComponent(ch.url || ch.iframeSrc || '')}', '${encodeURIComponent(ch.logo || '')}')" style="min-width: 160px;">
            <div class="ch-logo-wrap">
                <img src="${ch.logo || 'assets/default-channel.png'}" alt="${ch.name}" onerror="this.src='assets/default-channel.png'">
            </div>
            <h4>${ch.name}</h4>
            <p>${ch.tournament || 'Live Stream'}</p>
            <button class="watch-btn-small"><i class="fa-solid fa-play"></i> Watch</button>
        </div>
    `).join('');
}

function renderPopularChannels(channels) {
    const container = document.getElementById("channelsContainer");
    if (!container) return;

    if (channels.length === 0) {
        container.innerHTML = `<div class="no-results-box"><p>No channels found.</p></div>`;
        return;
    }

    container.innerHTML = channels.slice(0, 4).map(ch => `
        <div class="channel-card" onclick="openPlayer('${encodeURIComponent(ch.name)}', '${encodeURIComponent(ch.url || ch.iframeSrc || '')}', '${encodeURIComponent(ch.logo || '')}')">
            <div class="ch-logo-wrap">
                <img src="${ch.logo || 'assets/default-channel.png'}" alt="${ch.name}" onerror="this.src='assets/default-channel.png'">
            </div>
            <h4>${ch.name}</h4>
            <p>${ch.language || 'HD'}</p>
            <button class="watch-btn-small"><i class="fa-solid fa-play"></i> Watch Now</button>
        </div>
    `).join('');
}

function renderTrendingStreams(channels) {
    const container = document.getElementById("trendingContainer");
    if (!container) return;

    container.innerHTML = channels.slice(4, 7).map(ch => `
        <div class="channel-card" style="flex-direction: row; text-align: left; gap: 12px; margin-bottom: 8px;" onclick="openPlayer('${encodeURIComponent(ch.name)}', '${encodeURIComponent(ch.url || ch.iframeSrc || '')}', '${encodeURIComponent(ch.logo || '')}')">
            <div class="ch-logo-wrap" style="margin-bottom:0; min-width: 50px; width: 50px; height: 50px;">
                <img src="${ch.logo || 'assets/default-channel.png'}" alt="${ch.name}" onerror="this.src='assets/default-channel.png'">
            </div>
            <div style="flex: 1; overflow: hidden;">
                <h4 style="margin-bottom: 2px;">${ch.name}</h4>
                <p style="margin-bottom: 0;">High Speed Secure Link • 1080p</p>
            </div>
            <i class="fa-solid fa-chevron-right text-secondary" style="font-size: 0.8rem;"></i>
        </div>
    `).join('');
}

function openPlayer(name, url, logo) {
    window.location.href = `player.html?name=${name}&url=${url}&logo=${logo}`;
}
