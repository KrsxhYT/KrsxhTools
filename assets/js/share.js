// Share and Download functionality
document.addEventListener('DOMContentLoaded', function() {
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
        if (!window.lastNumberResult) return;
        
        const result = window.lastNumberResult;
        const shareText = `Number Information from KrsxhTools:\n` +
                         `Phone: ${result.number}\n` +
                         `Country: ${result.country}\n` +
                         `Carrier: ${result.carrier}\n` +
                         `Location: ${result.location}\n` +
                         `Type: ${result.type}\n` +
                         `Valid: ${result.valid ? 'Yes' : 'No'}\n\n` +
                         `Check it out: ${generateShareURL('number', result.number)}`;
        
        shareContent(shareText);
    }
    
    function shareDeviceResult() {
        if (!window.lastDeviceResult) return;
        
        const result = window.lastDeviceResult;
        const shareText = `My Device Information from KrsxhTools:\n` +
                         `IPv4: ${result.ipv4}\n` +
                         `IPv6: ${result.ipv6}\n` +
                         `Browser: ${result.browser}\n` +
                         `OS: ${result.os}\n` +
                         `Screen: ${result.screen}\n\n` +
                         `Check it out: ${generateShareURL('device', result.ipv4)}`;
        
        shareContent(shareText);
    }
    
    function shareIPResult() {
        if (!window.lastIPResult) return;
        
        const result = window.lastIPResult;
        const shareText = `IP Information from KrsxhTools:\n` +
                         `IP: ${result.ip || result.query}\n` +
                         `Country: ${result.country_name || result.country}\n` +
                         `City: ${result.city}\n` +
                         `ISP: ${result.org || result.isp}\n\n` +
                         `Check it out: ${generateShareURL('ip', result.ip || result.query)}`;
        
        shareContent(shareText);
    }
    
    function generateShareURL(tool, result) {
        const baseURL = 'https://krsxh-tools.vercel.app';
        return `${baseURL}/${tool}/${encodeURIComponent(result)}`;
    }
    
    function shareContent(text) {
        if (navigator.share) {
            // Use Web Share API if available
            navigator.share({
                title: 'KrsxhTools Result',
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
            alert('Result copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Last resort - show text in alert
            alert('Share this result:\n\n' + text);
        });
    }
    
    function downloadResult(type) {
        const element = document.getElementById(`${type}Result`);
        if (!element) return;
        
        // In a real implementation, you would use html2canvas or similar library
        // to convert the result card to PNG
        
        alert('Download feature would convert this result to PNG image. ' +
              'In a full implementation, this would use html2canvas library.');
        
        // Example of how it would work with html2canvas:
        /*
        html2canvas(element).then(canvas => {
            const link = document.createElement('a');
            link.download = `krsxhtools-${type}-result.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
        */
    }
});
