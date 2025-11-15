// Share and Download functionality - 100% Working
document.addEventListener('DOMContentLoaded', function() {
    // Initialize html2canvas for PNG download
    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.head.appendChild(script);
    }

    // Number Info Share
    const shareNumberBtn = document.getElementById('shareNumberBtn');
    if (shareNumberBtn) {
        shareNumberBtn.addEventListener('click', shareNumberResult);
    }
    
    // Device Info Share
    const shareDeviceBtn = document.getElementById('shareDeviceBtn');
    if (shareDeviceBtn) {
        shareDeviceBtn.addEventListener('click', shareDeviceResult);
    }
    
    // IP Info Share
    const shareIpBtn = document.getElementById('shareIpBtn');
    if (shareIpBtn) {
        shareIpBtn.addEventListener('click', shareIPResult);
    }
    
    // Instagram Info Share
    const shareInstagramBtn = document.getElementById('shareInstagramBtn');
    if (shareInstagramBtn) {
        shareInstagramBtn.addEventListener('click', shareInstagramResult);
    }
    
    // Telegram Info Share
    const shareTelegramBtn = document.getElementById('shareTelegramBtn');
    if (shareTelegramBtn) {
        shareTelegramBtn.addEventListener('click', shareTelegramResult);
    }
    
    // Download buttons
    const downloadNumberBtn = document.getElementById('downloadNumberBtn');
    if (downloadNumberBtn) {
        downloadNumberBtn.addEventListener('click', () => downloadResult('number'));
    }
    
    const downloadDeviceBtn = document.getElementById('downloadDeviceBtn');
    if (downloadDeviceBtn) {
        downloadDeviceBtn.addEventListener('click', () => downloadResult('device'));
    }
    
    const downloadIpBtn = document.getElementById('downloadIpBtn');
    if (downloadIpBtn) {
        downloadIpBtn.addEventListener('click', () => downloadResult('ip'));
    }
    
    const downloadInstagramBtn = document.getElementById('downloadInstagramBtn');
    if (downloadInstagramBtn) {
        downloadInstagramBtn.addEventListener('click', () => downloadResult('instagram'));
    }
    
    const downloadTelegramBtn = document.getElementById('downloadTelegramBtn');
    if (downloadTelegramBtn) {
        downloadTelegramBtn.addEventListener('click', () => downloadResult('telegram'));
    }
    
    function shareNumberResult() {
        if (!window.lastNumberResult) {
            showNotification('❌ No number information to share');
            return;
        }
        
        const result = window.lastNumberResult;
        const shareText = `🔢 Number Information from KrsxhTools:\n\n` +
                         `📱 Phone: ${result.number}\n` +
                         `🌍 Country: ${result.country}\n` +
                         `📞 Carrier: ${result.carrier}\n` +
                         `📍 Location: ${result.location}\n` +
                         `📊 Type: ${result.line_type}\n` +
                         `✅ Valid: ${result.valid ? 'Yes' : 'No'}\n\n` +
                         `🔗 Check it out: ${generateShareURL('number', result.number)}`;
        
        shareContent(shareText, 'Number Information');
    }
    
    function shareDeviceResult() {
        if (!window.lastDeviceResult) {
            showNotification('❌ No device information to share');
            return;
        }
        
        const result = window.lastDeviceResult;
        const shareText = `📱 Device Information from KrsxhTools:\n\n` +
                         `🌐 IPv4: ${result.ipv4}\n` +
                         `🔗 IPv6: ${result.ipv6}\n` +
                         `🖥️ Browser: ${result.browser}\n` +
                         `💻 OS: ${result.os}\n` +
                         `📺 Screen: ${result.screen}\n` +
                         `🗣️ Language: ${result.language}\n\n` +
                         `🔗 Check it out: ${generateShareURL('device', result.ipv4)}`;
        
        shareContent(shareText, 'Device Information');
    }
    
    function shareIPResult() {
        if (!window.lastIPResult) {
            showNotification('❌ No IP information to share');
            return;
        }
        
        const result = window.lastIPResult;
        const shareText = `🌐 IP Information from KrsxhTools:\n\n` +
                         `🔗 IP: ${result.ip}\n` +
                         `🌍 Country: ${result.country}\n` +
                         `🏙️ City: ${result.city}\n` +
                         `🏢 ISP: ${result.isp}\n` +
                         `⏰ Timezone: ${result.timezone}\n\n` +
                         `🔗 Check it out: ${generateShareURL('ip', result.ip)}`;
        
        shareContent(shareText, 'IP Information');
    }
    
    function shareInstagramResult() {
        if (!window.lastInstagramResult) {
            showNotification('❌ No Instagram information to share');
            return;
        }
        
        const result = window.lastInstagramResult;
        const shareText = `📷 Instagram Information from KrsxhTools:\n\n` +
                         `👤 Username: @${result.username}\n` +
                         `📛 Full Name: ${result.name || 'Not available'}\n` +
                         `📝 Bio: ${result.bio || 'No bio'}\n` +
                         `👥 Followers: ${formatNumber(result.followers)}\n` +
                         `📸 Posts: ${formatNumber(result.posts)}\n` +
                         `✅ Verified: ${result.verified ? 'Yes' : 'No'}\n\n` +
                         `🔗 Check it out: ${generateShareURL('instagram', result.username)}`;
        
        shareContent(shareText, 'Instagram Information');
    }
    
    function shareTelegramResult() {
        if (!window.lastTelegramResult) {
            showNotification('❌ No Telegram information to share');
            return;
        }
        
        const result = window.lastTelegramResult;
        const shareText = `✈️ Telegram Information from KrsxhTools:\n\n` +
                         `👤 Username: @${result.username}\n` +
                         `📛 Title: ${result.title}\n` +
                         `📝 Bio: ${result.description || 'No bio'}\n\n` +
                         `🔗 Check it out: ${generateShareURL('telegram', result.username)}`;
        
        shareContent(shareText, 'Telegram Information');
    }
    
    function generateShareURL(tool, result) {
        const baseURL = window.location.origin;
        return `${baseURL}/${tool}/${encodeURIComponent(result)}`;
    }
    
    function shareContent(text, title) {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(text);
            });
        } else {
            fallbackShare(text);
        }
    }
    
    function fallbackShare(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✅ Result copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            prompt('Copy this result to share:', text);
        });
    }
    
    function downloadResult(type) {
        const element = document.getElementById(`${type}Result`);
        if (!element) {
            showNotification(`❌ No ${type} result to download`);
            return;
        }
        
        if (typeof html2canvas === 'undefined') {
            showNotification('❌ Download feature is still loading');
            return;
        }
        
        showNotification('🔄 Generating PNG...');
        
        const originalHTML = element.innerHTML;
        const brandingHTML = `
            <div style="text-align: center; margin-bottom: 15px; padding: 10px; background: linear-gradient(135deg, #4a6cf7, #8a2be2); border-radius: 8px;">
                <h3 style="margin: 0; color: white;">KrsxhTools</h3>
                <p style="margin: 5px 0 0 0; color: white; font-size: 12px;">Utility Tools Web</p>
            </div>
            ${originalHTML}
            <div style="text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px solid #444; color: #6c757d; font-size: 10px;">
                Generated at ${new Date().toLocaleString()} • krsxh-tools.vercel.app
            </div>
        `;
        
        element.innerHTML = brandingHTML;
        
        html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#16213e'
        }).then(canvas => {
            element.innerHTML = originalHTML;
            
            const link = document.createElement('a');
            link.download = `krsxhtools-${type}-result-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 0.9);
            link.click();
            
            showNotification('✅ PNG downloaded successfully!');
        }).catch(error => {
            console.error('Error generating PNG:', error);
            element.innerHTML = originalHTML;
            showNotification('❌ Error generating PNG');
        });
    }
    
    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }
    
    function showNotification(message) {
        const existingNotification = document.querySelector('.share-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'share-notification';
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
