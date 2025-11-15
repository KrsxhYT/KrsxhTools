// Instagram Info Tool JavaScript - 100% Real Working
document.addEventListener('DOMContentLoaded', function() {
    const instagramUsername = document.getElementById('instagramUsername');
    const getInstagramInfoBtn = document.getElementById('getInstagramInfo');
    const instagramResult = document.getElementById('instagramResult');
    
    getInstagramInfoBtn.addEventListener('click', function() {
        const username = instagramUsername.value.trim();
        
        if (!username) {
            showNotification('❌ Please enter an Instagram username');
            return;
        }
        
        if (!isValidInstagramUsername(username)) {
            showNotification('❌ Please enter a valid Instagram username');
            return;
        }
        
        getRealInstagramInfo(username);
    });
    
    function isValidInstagramUsername(username) {
        const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
        return instagramRegex.test(username) && !username.includes('..') && !username.startsWith('.') && !username.endsWith('.');
    }
    
    async function getRealInstagramInfo(username) {
        getInstagramInfoBtn.textContent = 'Getting Info...';
        getInstagramInfoBtn.disabled = true;
        instagramResult.style.display = 'none';
        
        try {
            const API_URL = `https://instagram-info.rakibsarvar12.workers.dev/info?username=${encodeURIComponent(username)}`;
            
            console.log('Fetching Instagram info from:', API_URL);
            
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
            console.log('Instagram API response:', data);
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            displayRealInstagramInfo(data);
            window.lastInstagramResult = data;
            showNotification('✅ Instagram information retrieved successfully!');
            
        } catch (error) {
            console.error('Error fetching Instagram info:', error);
            showNotification('❌ Failed to fetch Instagram info: ' + error.message, 'error');
        } finally {
            getInstagramInfoBtn.textContent = 'Get Instagram Info';
            getInstagramInfoBtn.disabled = false;
        }
    }
    
    function displayRealInstagramInfo(data) {
        const profileHeader = document.getElementById('profileHeader');
        profileHeader.innerHTML = '';
        
        // Create profile image
        if (data.pic) {
            const profileImg = document.createElement('img');
            profileImg.src = data.pic;
            profileImg.alt = `${data.username} profile picture`;
            profileImg.style.cssText = `
                width: 80px; height: 80px; border-radius: 50%; margin-right: 15px;
                border: 3px solid #E4405F;
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
        nameElement.textContent = data.name || data.username;
        nameElement.style.cssText = 'margin: 0 0 5px 0; color: var(--primary); font-size: 1.2rem;';
        
        const usernameElement = document.createElement('p');
        usernameElement.textContent = `@${data.username}`;
        usernameElement.style.cssText = 'margin: 0; color: var(--gray); font-size: 0.9rem;';
        
        profileInfo.appendChild(nameElement);
        profileInfo.appendChild(usernameElement);
        profileHeader.appendChild(profileInfo);
        
        // Update information fields
        document.getElementById('igUsername').textContent = `@${data.username}`;
        document.getElementById('igFullName').textContent = data.name || 'Not available';
        document.getElementById('igBio').textContent = data.bio || 'No bio available';
        document.getElementById('igFollowers').textContent = formatNumber(data.followers);
        document.getElementById('igFollowing').textContent = formatNumber(data.following);
        document.getElementById('igPosts').textContent = formatNumber(data.posts);
        document.getElementById('igPrivate').textContent = data.private ? '🔒 Yes' : '🔓 No';
        document.getElementById('igVerified').textContent = data.verified ? '✅ Yes' : '❌ No';
        document.getElementById('igExternalUrl').textContent = data.external_url || 'Not available';
        
        // Add verification badge if verified
        if (data.verified) {
            const verifiedBadge = document.createElement('span');
            verifiedBadge.textContent = ' ✅';
            verifiedBadge.title = 'Verified Account';
            verifiedBadge.style.cssText = 'color: #3897f0; margin-left: 5px;';
            nameElement.appendChild(verifiedBadge);
        }
        
        instagramResult.style.display = 'block';
        
        // Scroll to results smoothly
        setTimeout(() => {
            instagramResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    function showNotification(message, type = 'success') {
        const existingNotification = document.querySelector('.instagram-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'instagram-notification';
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
