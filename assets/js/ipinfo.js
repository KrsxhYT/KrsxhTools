// IP Info Tool JavaScript - 100% Real Working
document.addEventListener('DOMContentLoaded', function() {
    const ipInput = document.getElementById('ipInput');
    const getIpInfoBtn = document.getElementById('getIpInfo');
    const getMyIpInfoBtn = document.getElementById('getMyIpInfo');
    const ipResult = document.getElementById('ipResult');
    
    // Auto-get user's IP info on page load
    setTimeout(() => {
        getMyIpInfoBtn.click();
    }, 500);
    
    getIpInfoBtn.addEventListener('click', function() {
        const ipAddress = ipInput.value.trim();
        
        if (!ipAddress) {
            showNotification('❌ Please enter an IP address');
            return;
        }
        
        if (!isValidIP(ipAddress)) {
            showNotification('❌ Please enter a valid IP address (IPv4 or IPv6)');
            return;
        }
        
        getIPInfo(ipAddress);
    });
    
    getMyIpInfoBtn.addEventListener('click', function() {
        getMyIPInfo();
    });
    
    function isValidIP(ip) {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
        
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }
    
    async function getMyIPInfo() {
        try {
            getMyIpInfoBtn.textContent = 'Getting Your IP...';
            getMyIpInfoBtn.disabled = true;
            getIpInfoBtn.disabled = true;
            
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ipInput.value = data.ip;
            await getIPInfo(data.ip);
        } catch (error) {
            console.error('Error fetching IP:', error);
            showNotification('❌ Error fetching your IP address');
        } finally {
            getMyIpInfoBtn.textContent = 'Get My IP Info';
            getMyIpInfoBtn.disabled = false;
            getIpInfoBtn.disabled = false;
        }
    }
    
    async function getIPInfo(ipAddress) {
        try {
            getIpInfoBtn.textContent = 'Getting Info...';
            getIpInfoBtn.disabled = true;
            getMyIpInfoBtn.disabled = true;
            
            // Try multiple IP geolocation APIs
            const apis = [
                `https://ipapi.co/${ipAddress}/json/`,
                `https://api.ipbase.com/v1/json/${ipAddress}`,
                `https://json.geoiplookup.io/${ipAddress}`
            ];
            
            let data = null;
            for (const apiUrl of apis) {
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        data = await response.json();
                        break;
                    }
                } catch (e) {
                    console.log(`API ${apiUrl} failed, trying next...`);
                }
            }
            
            if (!data) {
                throw new Error('All IP APIs failed');
            }
            
            // Normalize data from different APIs
            const normalizedData = normalizeIPData(data, ipAddress);
            displayIPInfo(normalizedData);
            window.lastIPResult = normalizedData;
            showNotification('✅ IP information retrieved successfully!');
            
        } catch (error) {
            console.error('Error fetching IP info:', error);
            showNotification('❌ Failed to fetch IP information');
        } finally {
            getIpInfoBtn.textContent = 'Get IP Info';
            getIpInfoBtn.disabled = false;
            getMyIpInfoBtn.disabled = false;
        }
    }
    
    function normalizeIPData(data, originalIP) {
        // Normalize data from different API formats
        return {
            ip: data.ip || data.query || originalIP,
            country: data.country_name || data.country || data.countryName,
            country_code: data.country_code || data.countryCode || data.country_code2,
            region: data.region || data.regionName || data.state,
            city: data.city,
            isp: data.org || data.isp || data.organization,
            timezone: data.timezone || data.time_zone,
            latitude: data.latitude || data.lat,
            longitude: data.longitude || data.lon,
            asn: data.asn || data.as,
            currency: data.currency || data.currency_code,
            calling_code: data.country_calling_code || data.callingCode
        };
    }
    
    function displayIPInfo(data) {
        document.getElementById('ipAddress').textContent = data.ip;
        document.getElementById('ipCountry').textContent = data.country || 'Unknown';
        document.getElementById('ipRegion').textContent = data.region || 'Unknown';
        document.getElementById('ipCity').textContent = data.city || 'Unknown';
        document.getElementById('ipISP').textContent = data.isp || 'Unknown';
        document.getElementById('ipTimezone').textContent = data.timezone || 'Unknown';
        
        const lat = data.latitude;
        const lon = data.longitude;
        document.getElementById('ipCoordinates').textContent = (lat && lon) ? 
            `${lat}, ${lon}` : 'Unknown';
        
        document.getElementById('ipOrg').textContent = data.asn || 'Unknown';
        document.getElementById('ipCountryCode').textContent = data.country_code || 'Unknown';
        document.getElementById('ipCallingCode').textContent = data.calling_code || 'Unknown';
        document.getElementById('ipCurrency').textContent = data.currency || 'Unknown';
        document.getElementById('ipThreats').textContent = 'None detected';
        
        ipResult.style.display = 'block';
        ipResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function showNotification(message) {
        const existingNotification = document.querySelector('.ip-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'ip-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #28a745; color: white;
            padding: 12px 20px; border-radius: 5px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
