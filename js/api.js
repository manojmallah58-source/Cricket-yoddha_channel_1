/* ==========================================================================
   Cricket Yoddha - JSON Fetch System
   ========================================================================== */

const API_CONFIG = {
    url: "https://raw.githubusercontent.com/manojmallah58-source/Cricket-yoddha-json/main/links.json",
    refreshInterval: 60000 // 60 seconds
};

/**
 * Fetch all sports channels and live links dynamically from JSON endpoint
 * @returns {Promise<Array|Object>} Data object or array of channels
 */
async function fetchChannelData() {
    try {
        const response = await fetch(API_CONFIG.url + "?t=" + new Date().getTime());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
        return null;
    }
}

/**
 * Auto-refresh configuration handler
 */
function initAutoRefresh(callback) {
    setInterval(async () => {
        const freshData = await fetchChannelData();
        if (freshData && typeof callback === 'function') {
            callback(freshData);
        }
    }, API_CONFIG.refreshInterval);
}
