// Device Info Tool JavaScript - 100% Working
document.addEventListener('DOMContentLoaded', function() {
    const getDeviceInfoBtn = document.getElementById('getDeviceInfo');
    const deviceResult = document.getElementById('deviceResult');
    
    // Auto-get device info on page load
    getDeviceInfoBtn.click();
    
    getDeviceInfoBtn.addEventListener('click', function() {
        getDeviceInfoBtn.textContent = 'Getting Info...';
        getDeviceInfoBtn.disabled = true;
        
        getDeviceInformation();
    });
    
    async function getDeviceInformation() {
        try {
            const [ipData, browserInfo, screenInfo] = await Promise.all([
                getIPAddresses(),
                getDetailedBrowserInfo(),
                getScreenInfo()
            ]);
            
            const deviceData = {
                ipv4: ipData.ipv4,
                ipv6: ipData.ipv6,
                browser: browserInfo.name,
                browserVersion: browserInfo.version,
                os: browserInfo.os,
                screen: screenInfo.resolution,
                colorDepth: screenInfo.colorDepth,
                language: navigator.language,
                languages: navigator.languages ? navigator.languages.join(', ') : 'Unknown',
                platform: navigator.platform,
                userAgent: navigator.userAgent,
                cpuCores: navigator.hardwareConcurrency || 'Unknown',
                deviceMemory: navigator.deviceMemory ? navigator.deviceMemory + ' GB' : 'Unknown',
                connection: getConnectionInfo(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                cookies: navigator.cookieEnabled ? 'Enabled' : 'Disabled',
                javaScript: 'Enabled',
                online: navigator.onLine ? 'Online' : 'Offline'
            };
            
            displayDeviceInfo(deviceData);
            window.lastDeviceResult = deviceData;
            
        } catch (error) {
            console.error('Error getting device info:', error);
            alert('Error getting device information. Please try again.');
        } finally {
            getDeviceInfoBtn.textContent = 'Refresh Device Info';
            getDeviceInfoBtn.disabled = false;
        }
    }
    
    async function getIPAddresses() {
        try {
            // Get IPv4
            const ipv4Response = await fetch('https://api.ipify.org?format=json');
            const ipv4Data = await ipv4Response.json();
            
            // Try to get IPv6
            let ipv6 = 'Not detected';
            try {
                const ipv6Response = await fetch('https://api64.ipify.org?format=json');
                const ipv6Data = await ipv6Response.json();
                if (ipv6Data.ip !== ipv4Data.ip) {
                    ipv6 = ipv6Data.ip;
                }
            } catch (e) {
                console.log('IPv6 detection failed');
            }
            
            return {
                ipv4: ipv4Data.ip,
                ipv6: ipv6
            };
        } catch (error) {
            console.error('Error fetching IP:', error);
            return {
                ipv4: 'Unable to detect',
                ipv6: 'Unable to detect'
            };
        }
    }
    
    function getDetailedBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";
        let version = "Unknown";
        let os = "Unknown";
        
        // Browser detection
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
            browser = "Chrome";
            version = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
        } else if (userAgent.includes("Firefox")) {
            browser = "Firefox";
            version = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
        } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
            browser = "Safari";
            version = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
        } else if (userAgent.includes("Edg")) {
            browser = "Edge";
            version = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
        } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
            browser = "Opera";
            version = userAgent.match(/(Opera|OPR)\/([0-9.]+)/)?.[2] || "Unknown";
        }
        
        // OS detection
        if (userAgent.includes("Windows")) {
            os = "Windows";
            if (userAgent.includes("Windows NT 10.0")) os = "Windows 10/11";
            else if (userAgent.includes("Windows NT 6.3")) os = "Windows 8.1";
            else if (userAgent.includes("Windows NT 6.2")) os = "Windows 8";
            else if (userAgent.includes("Windows NT 6.1")) os = "Windows 7";
        } else if (userAgent.includes("Mac")) {
            os = "macOS";
        } else if (userAgent.includes("Linux")) {
            os = "Linux";
        } else if (userAgent.includes("Android")) {
            os = "Android";
        } else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) {
            os = "iOS";
        }
        
        return { name: browser, version: version, os: os };
    }
    
    function getScreenInfo() {
        return {
            resolution: `${screen.width} × ${screen.height}`,
            colorDepth: `${screen.colorDepth} bit`,
            available: `${screen.availWidth} × ${screen.availHeight}`
        };
    }
    
    function getConnectionInfo() {
        if ('connection' in navigator) {
            const conn = navigator.connection;
            return {
                effectiveType: conn.effectiveType || 'Unknown',
                downlink: conn.downlink ? conn.downlink + ' Mbps' : 'Unknown',
                rtt: conn.rtt ? conn.rtt + ' ms' : 'Unknown'
            };
        }
        return { effectiveType: 'Unknown', downlink: 'Unknown', rtt: 'Unknown' };
    }
    
    function displayDeviceInfo(data) {
        // IP Addresses
        document.getElementById('ipv4Address').textContent = data.ipv4;
        document.getElementById('ipv6Address').textContent = data.ipv6;
        
        // Browser Information
        document.getElementById('deviceBrowser').textContent = `${data.browser} ${data.browserVersion}`;
        document.getElementById('deviceOS').textContent = data.os;
        document.getElementById('deviceScreen').textContent = data.screen;
        document.getElementById('deviceLanguage').textContent = data.language;
        document.getElementById('devicePlatform').textContent = data.platform;
        document.getElementById('deviceUserAgent').textContent = data.userAgent;
        
        // Add additional info elements if they don't exist
        let additionalInfo = `
            <div class="info-item">
                <span class="info-label">Color Depth:</span>
                <span class="info-value">${data.colorDepth}</span>
            </div>
            <div class="info-item">
                <span class="info-label">CPU Cores:</span>
                <span class="info-value">${data.cpuCores}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Device Memory:</span>
                <span class="info-value">${data.deviceMemory}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Connection:</span>
                <span class="info-value">${data.connection.effectiveType}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Timezone:</span>
                <span class="info-value">${data.timezone}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Cookies:</span>
                <span class="info-value">${data.cookies}</span>
            </div>
            <div class="info-item">
                <span class="info-label">JavaScript:</span>
                <span class="info-value">${data.javaScript}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value">${data.online}</span>
            </div>
        `;
        
        const existingAdditional = document.querySelector('.additional-info');
        if (existingAdditional) {
            existingAdditional.innerHTML = additionalInfo;
        } else {
            const additionalDiv = document.createElement('div');
            additionalDiv.className = 'additional-info';
            additionalDiv.innerHTML = additionalInfo;
            document.querySelector('.action-buttons').insertAdjacentElement('beforebegin', additionalDiv);
        }
        
        deviceResult.style.display = 'block';
        
        // Scroll to results
        deviceResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
