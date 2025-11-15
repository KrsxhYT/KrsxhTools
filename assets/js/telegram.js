// Telegram Info Tool JavaScript - 100% Real Working
document.addEventListener('DOMContentLoaded', function() {
    const telegramUsername = document.getElementById('telegramUsername');
    const getTelegramInfoBtn = document.getElementById('getTelegramInfo');
    const telegramResult = document.getElementById('telegramResult');
    
    getTelegramInfoBtn.addEventListener('click', function() {
        const username = telegramUsername.value.trim();
        
        if (!username) {
            showNotification('❌ Please enter a Telegram username');
            return;
        }
        
        if (!isValidTelegramUsername(username)) {
            showNotification('❌ Please enter a valid Telegram username');
            return;
        }
        
        getRealTelegramInfo(username);
    });
    
    function isValidTelegramUsername(username) {
        const telegramRegex = /^[a-zA-Z0-9_]{5,32}$/;
        return telegramRegex.test(username);
    }
    
    async function getRealTelegramInfo(username) {
        getTelegramInfoBtn.textContent = 'Getting Info...';
        getTelegramInfoBtn.disabled = true;
        telegramResult.style.display = 'none';
        
        try {
            const API_URL = `https://telegram-user-info.rakibsarvar12.workers.dev/?username=${encodeURIComponent(username)}`;
            
            console.log('Fetching Telegram info from:', API_URL);
            
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'KrsxhTools/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log('Telegram API response:', data);
            
            if (data.status !== 'success') {
                throw new Error('User not found or API error');
            }
            
            displayRealTelegramInfo(data);
            window.lastTelegramResult = data;
            showNotification('✅ Telegram information retrieved successfully!');
            
        } catch (error) {
            console.error('Error fetching Telegram info:', error);
            showNotification('❌ Failed to fetch Telegram info: ' + error.message, 'error');
        } finally {
            getTelegramInfoBtn.textContent = 'Get Telegram Info';
            getTelegramInfoBtn.disabled = false;
        }
    }
    
    function displayRealTelegramInfo(data) {
        const profileHeader = document.getElementById('tgProfileHeader');
        profileHeader.innerHTML = '';
        
        // Create profile image
        if (data.image_url) {
            const profileImg = document.createElement('img');
            profileImg.src = data.image_url;
            profileImg.alt = `${data.username} profile picture`;
            profileImg.style.cssText = `
                width: 80px; height: 80px; border-radius: 50%; margin-right: 15px;
                border: 3px solid #0088cc;
            `;
            profileImg.onerror = function() {
                this.style.display = 'none';
            };
            profileHeader.appendChild(profileImg);
        }
        
        // Create profile info
        const profileInfo = document.createElement('div');
        profileInfo.style.cssText = 'display: flex; flex-direction: column; justify-content: center;';
        
        const nameElement = document.createElement('h4');
        nameElement.innerHTML = decodeHtmlEntities(data.title || data.username);
        nameElement.style.cssText = 'margin: 0 0 5px 0; color: var(--primary); font-size: 1.2rem;';
        
        const usernameElement = document.createElement('p');
        usernameElement.textContent = `@${data.username}`;
        usernameElement.style.cssText = 'margin: 0; color: var(--gray); font-size: 0.9rem;';
        
        profileInfo.appendChild(nameElement);
        profileInfo.appendChild(usernameElement);
        profileHeader.appendChild(profileInfo);
        
        // Update information fields
        document.getElementById('tgUsername').textContent = `@${data.username}`;
        document.getElementById('tgTitle').innerHTML = decodeHtmlEntities(data.title || 'Not available');
        document.getElementById('tgDescription').innerHTML = decodeHtmlEntities(data.description || 'No description available');
        document.getElementById('tgSiteName').textContent = data.site_name || 'Telegram';
        document.getElementById('tgStatus').textContent = data.status === 'success' ? '✅ Active' : '❌ Not found';
        
        telegramResult.style.display = 'block';
        
        // Scroll to results smoothly
        setTimeout(() => {
            telegramResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    function decodeHtmlEntities(text) {
        if (!text) return '';
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    function showNotification(message, type = 'success') {
        const existingNotification = document.querySelector('.telegram-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'telegram-notification';
        notification.textContent = message;
        
        const backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
        
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: ${backgroundColor}; color: white;
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
