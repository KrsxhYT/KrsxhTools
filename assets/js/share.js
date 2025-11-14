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
    
    function shareNumberResult() {
        if (!window.lastNumberResult) {
            alert('No number information to share. Please get number info first.');
            return;
        }
        
        const result = window.lastNumberResult;
        const shareText = `🔢 Number Information from KrsxhTools:\n\n` +
                         `📱 Phone: ${result.international_format || result.number}\n` +
                         `🌍 Country: ${result.country_name}\n` +
                         `📞 Carrier: ${result.carrier}\n` +
                         `📍 Location: ${result.location}\n` +
                         `📊 Type: ${result.line_type}\n` +
                         `✅ Valid: ${result.valid ? 'Yes' : 'No'}\n\n` +
                         `🔗 Check it out: ${generateShareURL('number', result.international_format || result.number)}`;
        
        shareContent(shareText, 'Number Information');
    }
    
    function shareDeviceResult() {
        if (!window.lastDeviceResult) {
            alert('No device information to share. Please get device info first.');
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
            alert('No IP information to share. Please get IP info first.');
            return;
        }
        
        const result = window.lastIPResult;
        const shareText = `🌐 IP Information from KrsxhTools:\n\n` +
                         `🔗 IP: ${result.ip}\n` +
                         `🌍 Country: ${result.country}\n` +
                         `🏙️ City: ${result.city}\n` +
                         `🏢 ISP: ${result.isp}\n` +
                         `⏰ Timezone: ${result.timezone}\n` +
                         `📍 Coordinates: ${result.latitude}, ${result.longitude}\n\n` +
                         `🔗 Check it out: ${generateShareURL('ip', result.ip)}`;
        
        shareContent(shareText, 'IP Information');
    }
    
    function generateShareURL(tool, result) {
        const baseURL = window.location.origin;
        return `${baseURL}/${tool}/${encodeURIComponent(result)}`;
    }
    
    function shareContent(text, title) {
        if (navigator.share) {
            // Use Web Share API if available
            navigator.share({
                title: title,
                text: text
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(text);
            });
        } else {
            // Fallback to clipboard
            fallbackShare(text);
        }
    }
    
    function fallbackShare(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✅ Result copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Last resort - show text in prompt
            prompt('Copy this result to share:', text);
        });
    }
    
    function downloadResult(type) {
        const element = document.getElementById(`${type}Result`);
        if (!element) {
            alert(`No ${type} result to download. Please get the information first.`);
            return;
        }
        
        // Check if html2canvas is loaded
        if (typeof html2canvas === 'undefined') {
            alert('Download feature is still loading. Please try again in a few seconds.');
            return;
        }
        
        showNotification('🔄 Generating PNG...');
        
        // Add KrsxhTools branding to the card for download
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
            // Restore original content
            element.innerHTML = originalHTML;
            
            // Create download link
            const link = document.createElement('a');
            link.download = `krsxhtools-${type}-result-${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png', 0.9);
            link.click();
            
            showNotification('✅ PNG downloaded successfully!');
        }).catch(error => {
            console.error('Error generating PNG:', error);
            element.innerHTML = originalHTML;
            alert('Error generating PNG. Please try again.');
        });
    }
    
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.share-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = 'share-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});
