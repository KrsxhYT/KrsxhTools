// Number Info Tool JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('numberInput');
    const getNumberInfoBtn = document.getElementById('getNumberInfo');
    const numberResult = document.getElementById('numberResult');
    
    getNumberInfoBtn.addEventListener('click', function() {
        const phoneNumber = numberInput.value.trim();
        
        if (!phoneNumber) {
            alert('Please enter a phone number');
            return;
        }
        
        // Simulate API call - in real implementation, you would use a phone number lookup API
        simulateNumberLookup(phoneNumber);
    });
    
    function simulateNumberLookup(phoneNumber) {
        // Show loading state
        getNumberInfoBtn.textContent = 'Getting Info...';
        getNumberInfoBtn.disabled = true;
        
        // Simulate API delay
        setTimeout(() => {
            // Mock data - in real implementation, you would get this from an API
            const mockData = {
                number: phoneNumber,
                country: getCountryFromNumber(phoneNumber),
                carrier: getRandomCarrier(),
                location: getRandomLocation(),
                type: getRandomNumberType(),
                valid: Math.random() > 0.1 // 90% chance of being valid
            };
            
            displayNumberInfo(mockData);
            
            // Reset button
            getNumberInfoBtn.textContent = 'Get Number Info';
            getNumberInfoBtn.disabled = false;
        }, 1500);
    }
    
    function displayNumberInfo(data) {
        document.getElementById('numberValue').textContent = data.number;
        document.getElementById('numberCountry').textContent = data.country;
        document.getElementById('numberCarrier').textContent = data.carrier;
        document.getElementById('numberLocation').textContent = data.location;
        document.getElementById('numberType').textContent = data.type;
        document.getElementById('numberValid').textContent = data.valid ? 'Yes' : 'No';
        
        numberResult.style.display = 'block';
        
        // Store data for sharing
        window.lastNumberResult = data;
    }
    
    // Helper functions for mock data
    function getCountryFromNumber(number) {
        if (number.startsWith('+1')) return 'United States';
        if (number.startsWith('+91')) return 'India';
        if (number.startsWith('+44')) return 'United Kingdom';
        if (number.startsWith('+49')) return 'Germany';
        if (number.startsWith('+33')) return 'France';
        return 'International';
    }
    
    function getRandomCarrier() {
        const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Vodafone', 'Airtel', 'Jio', 'Orange', 'Deutsche Telekom'];
        return carriers[Math.floor(Math.random() * carriers.length)];
    }
    
    function getRandomLocation() {
        const locations = ['New York, NY', 'London, UK', 'Mumbai, MH', 'Berlin, DE', 'Paris, FR', 'Sydney, AU'];
        return locations[Math.floor(Math.random() * locations.length)];
    }
    
    function getRandomNumberType() {
        const types = ['Mobile', 'Landline', 'VoIP', 'Toll Free'];
        return types[Math.floor(Math.random() * types.length)];
    }
});
