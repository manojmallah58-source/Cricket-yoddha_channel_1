/* ==========================================================================
   Cricket Yoddha - Video Player Functions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const streamName = decodeURIComponent(params.get("name") || "Live Stream");
    const streamUrl = decodeURIComponent(params.get("url") || "");
    const channelLogo = decodeURIComponent(params.get("logo") || "assets/default-channel.png");

    // DOM Elements
    document.getElementById("streamTitle").textContent = streamName;
    document.getElementById("playerChannelName").textContent = streamName;
    document.getElementById("playerChannelLogo").src = channelLogo !== "null" && channelLogo !== "" ? channelLogo : "assets/default-channel.png";

    const iframe = document.getElementById("streamIframe");
    const loader = document.getElementById("playerLoader");
    const errorScreen = document.getElementById("playerErrorScreen");
    const retryBtn = document.getElementById("retryStreamBtn");

    if (!streamUrl || streamUrl === "null" || streamUrl === "") {
        loader.classList.add("hidden");
        errorScreen.classList.remove("hidden");
        return;
    }

    // Load Stream in iframe
    iframe.src = streamUrl;

    iframe.onload = () => {
        loader.classList.add("hidden");
    };

    // Timeout fallback if iframe fails/takes too long
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 4000);

    retryBtn.addEventListener("click", () => {
        errorScreen.classList.add("hidden");
        loader.classList.remove("hidden");
        iframe.src = "";
        setTimeout(() => {
            iframe.src = streamUrl;
        }, 500);
    });

    // Action buttons
    document.getElementById("backBtn").addEventListener("click", () => history.back());
    document.getElementById("refreshBtn").addEventListener("click", () => location.reload());
    document.getElementById("reloadStreamBtn").addEventListener("click", () => location.reload());
    
    document.getElementById("shareBtn").addEventListener("click", () => {
        if (navigator.share) {
            navigator.share({
                title: streamName,
                text: `Watch ${streamName} live on Cricket Yoddha!`,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Stream link copied to clipboard!");
        }
    });

    document.getElementById("fullscreenBtn").addEventListener("click", () => {
        const container = document.getElementById("videoContainer");
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
            container.webkitRequestFullscreen();
        }
    });
});
