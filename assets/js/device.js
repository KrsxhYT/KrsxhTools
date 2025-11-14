// Device Info Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const getDeviceInfoBtn = document.getElementById('getDeviceInfo');
    const deviceResult = document.getElementById('deviceResult');
    
    getDeviceInfoBtn.addEventListener('click', function() {
        getDeviceInfoBtn.textContent = 'Getting Info...';
        getDeviceInfoBtn.disabled = true;
        
        // Simulate slight delay for better UX
        setTimeout(() => {
            getDeviceInformation();
            getDeviceInfoBtn.textContent = 'Get My Device Info';
            getDeviceInfoBtn.disabled = false;
        }, 500);
    });
    
    function getDeviceInformation() {
        // Get IP addresses (this would normally come from an API)
        getIPAddresses().then(ipData => {
            const deviceData = {
                ipv4: ipData.ipv4 || 'Not detected',
                ipv6: ipData.ipv6 || 'Not detected',
                browser: getBrowserInfo(),
                os: getOSInfo(),
                screen: `${screen.width} x ${screen.height}`,
                language: navigator.language || 'Unknown',
                platform: navigator.platform,
                userAgent: navigator.userAgent
            };
            
            displayDeviceInfo(deviceData);
            window.lastDeviceResult = deviceData;
        });
    }
    
    async function getIPAddresses() {
        try {
            // Try to get IPv4 and IPv6 using a public API
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return {
                ipv4: data.ip,
                ipv6: 'Not detected' // Most APIs don't provide IPv6 easily
            };
        } catch (error) {
            console.error('Error fetching IP:', error);
            return {
                ipv4: 'Unable to detect',
                ipv6: 'Unable to detect'
            };
        }
    }
    
    function getBrowserInfo() {
        const userAgent = navigator.userAgent;
        let browser = "Unknown";
        
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browser = "Chrome";
        else if (userAgent.includes("Firefox")) browser = "Firefox";
        else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
        else if (userAgent.includes("Edg")) browser = "Edge";
        else if (userAgent.includes("Opera") || userAgent.includes("OPR")) browser = "Opera";
        
        return browser;
    }
    
    function getOSInfo() {
        const userAgent = navigator.userAgent;
        let os = "Unknown";
        
        if (userAgent.includes("Windows")) os = "Windows";
        else if (userAgent.includes("Mac")) os = "macOS";
        else if (userAgent.includes("Linux")) os = "Linux";
        else if (userAgent.includes("Android")) os = "Android";
        else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
        
        return os;
    }
    
    function displayDeviceInfo(data) {
        document.getElementById('ipv4Address').textContent = data.ipv4;
        document.getElementById('ipv6Address').textContent = data.ipv6;
        document.getElementById('deviceBrowser').textContent = data.browser;
        document.getElementById('deviceOS').textContent = data.os;
        document.getElementById('deviceScreen').textContent = data.screen;
        document.getElementById('deviceLanguage').textContent = data.language;
        document.getElementById('devicePlatform').textContent = data.platform;
        document.getElementById('deviceUserAgent').textContent = data.userAgent;
        
        deviceResult.style.display = 'block';
    }
});
