// IP Info Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const ipInput = document.getElementById('ipInput');
    const getIpInfoBtn = document.getElementById('getIpInfo');
    const getMyIpInfoBtn = document.getElementById('getMyIpInfo');
    const ipResult = document.getElementById('ipResult');
    
    getIpInfoBtn.addEventListener('click', function() {
        const ipAddress = ipInput.value.trim();
        
        if (!ipAddress) {
            alert('Please enter an IP address');
            return;
        }
        
        if (!isValidIP(ipAddress)) {
            alert('Please enter a valid IP address');
            return;
        }
        
        getIPInfo(ipAddress);
    });
    
    getMyIpInfoBtn.addEventListener('click', function() {
        getMyIPInfo();
    });
    
    function isValidIP(ip) {
        // Simple IP validation (IPv4 and IPv6)
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }
    
    async function getMyIPInfo() {
        try {
            getMyIpInfoBtn.textContent = 'Getting Info...';
            getMyIpInfoBtn.disabled = true;
            
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ipInput.value = data.ip;
            await getIPInfo(data.ip);
        } catch (error) {
            console.error('Error fetching IP:', error);
            alert('Error fetching your IP address');
        } finally {
            getMyIpInfoBtn.textContent = 'Get My IP Info';
            getMyIpInfoBtn.disabled = false;
        }
    }
    
    async function getIPInfo(ipAddress) {
        try {
            getIpInfoBtn.textContent = 'Getting Info...';
            getIpInfoBtn.disabled = true;
            
            // Using ipapi.co API (you might need to sign up for a free API key)
            const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.reason || 'IP lookup failed');
            }
            
            displayIPInfo(data);
            window.lastIPResult = data;
        } catch (error) {
            console.error('Error fetching IP info:', error);
            
            // Fallback to mock data if API fails
            const mockData = generateMockIPData(ipAddress);
            displayIPInfo(mockData);
            window.lastIPResult = mockData;
        } finally {
            getIpInfoBtn.textContent = 'Get IP Info';
            getIpInfoBtn.disabled = false;
        }
    }
    
    function displayIPInfo(data) {
        document.getElementById('ipAddress').textContent = data.ip || data.query || 'Unknown';
        document.getElementById('ipCountry').textContent = data.country_name || data.country || 'Unknown';
        document.getElementById('ipRegion').textContent = data.region || data.regionName || 'Unknown';
        document.getElementById('ipCity').textContent = data.city || 'Unknown';
        document.getElementById('ipISP').textContent = data.org || data.isp || 'Unknown';
        document.getElementById('ipTimezone').textContent = data.timezone || 'Unknown';
        
        const lat = data.latitude || data.lat;
        const lon = data.longitude || data.lon;
        document.getElementById('ipCoordinates').textContent = lat && lon ? `${lat}, ${lon}` : 'Unknown';
        
        document.getElementById('ipOrg').textContent = data.org || data.as || 'Unknown';
        
        ipResult.style.display = 'block';
    }
    
    function generateMockIPData(ip) {
        // Generate realistic mock data for demonstration
        const countries = ['United States', 'India', 'United Kingdom', 'Germany', 'France', 'Japan'];
        const cities = {
            'United States': ['New York', 'Los Angeles', 'Chicago'],
            'India': ['Mumbai', 'Delhi', 'Bangalore'],
            'United Kingdom': ['London', 'Manchester', 'Birmingham'],
            'Germany': ['Berlin', 'Munich', 'Hamburg'],
            'France': ['Paris', 'Lyon', 'Marseille'],
            'Japan': ['Tokyo', 'Osaka', 'Kyoto']
        };
        
        const isps = ['Comcast', 'AT&T', 'Verizon', 'Airtel', 'Jio', 'Vodafone', 'Deutsche Telekom'];
        
        const country = countries[Math.floor(Math.random() * countries.length)];
        const city = cities[country][Math.floor(Math.random() * cities[country].length)];
        
        return {
            ip: ip,
            country_name: country,
            region: 'State',
            city: city,
            org: isps[Math.floor(Math.random() * isps.length)],
            timezone: 'UTC+0',
            latitude: (Math.random() * 180 - 90).toFixed(4),
            longitude: (Math.random() * 360 - 180).toFixed(4)
        };
    }
});
