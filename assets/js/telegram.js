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
            
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.status !== 'success') {
                throw new Error('User not found or API error');
            }
            
            displayRealTelegramInfo(data);
            window.lastTelegramResult = data;
            showNotification('✅ Telegram information retrieved successfully!');
            
        } catch (error) {
            console.error('Error fetching Telegram info:', error);
            showNotification('❌ Failed to fetch Telegram info. User may not exist.');
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
            profileHeader.appendChild(profileImg);
        }
        
        // Create profile info
        const profileInfo = document.createElement('div');
        profileInfo.style.cssText = 'display: flex; flex-direction: column; justify-content: center;';
        
        const nameElement = document.createElement('h4');
        nameElement.innerHTML = data.title || data.username;
        nameElement.style.cssText = 'margin: 0 0 5px 0; color: var(--primary); font-size: 1.2rem;';
        
        const usernameElement = document.createElement('p');
        usernameElement.textContent = `@${data.username}`;
        usernameElement.style.cssText = 'margin: 0; color: var(--gray); font-size: 0.9rem;';
        
        profileInfo.appendChild(nameElement);
        profileInfo.appendChild(usernameElement);
        profileHeader.appendChild(profileInfo);
        
        // Update information fields
        document.getElementById('tgUsername').textContent = `@${data.username}`;
        document.getElementById('tgFirstName').textContent = data.title ? data.title.split(' ')[0] : 'Not available';
        document.getElementById('tgLastName').textContent = data.title ? data.title.split(' ').slice(1).join(' ') : 'Not available';
        document.getElementById('tgBio').textContent = data.description ? decodeHtmlEntities(data.description) : 'No bio available';
        document.getElementById('tgUserId').textContent = data.id || 'Not available';
        document.getElementById('tgDcId').textContent = data.dc_id || 'Not available';
        document.getElementById('tgPhone').textContent = data.phone || 'Hidden';
        document.getElementById('tgLanguage').textContent = data.lang_code || 'Not available';
        document.getElementById('tgPremium').textContent = data.premium ? '✅ Yes' : '❌ No';
        document.getElementById('tgVerified').textContent = data.verified ? '✅ Yes' : '❌ No';
        document.getElementById('tgRestricted').textContent = data.restricted ? '✅ Yes' : '❌ No';
        document.getElementById('tgScam').textContent = data.scam ? '✅ Yes' : '❌ No';
        document.getElementById('tgFake').textContent = data.fake ? '✅ Yes' : '❌ No';
        
        telegramResult.style.display = 'block';
        telegramResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function decodeHtmlEntities(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
    function showNotification(message) {
        const existingNotification = document.querySelector('.telegram-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'telegram-notification';
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
