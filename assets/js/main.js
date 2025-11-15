// Common JavaScript for all pages - KrsxhTools
document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Check for shared results in URL
    checkSharedResults();
    
    // Add loading animation to buttons
    addButtonLoadingStates();
    
    // Add tooltips for better UX
    addTooltips();
});

function checkSharedResults() {
    const path = window.location.pathname;
    const parts = path.split('/');
    
    if (parts.length >= 3) {
        const tool = parts[1];
        const result = decodeURIComponent(parts[2]);
        
        switch(tool) {
            case 'number':
                if (document.getElementById('numberInput')) {
                    document.getElementById('numberInput').value = result;
                    setTimeout(() => {
                        document.getElementById('getNumberInfo').click();
                    }, 500);
                }
                break;
            case 'device':
                if (document.getElementById('getDeviceInfo')) {
                    setTimeout(() => {
                        document.getElementById('getDeviceInfo').click();
                    }, 500);
                }
                break;
            case 'ip':
                if (document.getElementById('ipInput')) {
                    document.getElementById('ipInput').value = result;
                    setTimeout(() => {
                        document.getElementById('getIpInfo').click();
                    }, 500);
                }
                break;
            case 'instagram':
                if (document.getElementById('instagramUsername')) {
                    document.getElementById('instagramUsername').value = result;
                    setTimeout(() => {
                        document.getElementById('getInstagramInfo').click();
                    }, 500);
                }
                break;
            case 'telegram':
                if (document.getElementById('telegramUsername')) {
                    document.getElementById('telegramUsername').value = result;
                    setTimeout(() => {
                        document.getElementById('getTelegramInfo').click();
                    }, 500);
                }
                break;
        }
        
        // Clean URL without reload
        window.history.replaceState({}, document.title, '/' + tool);
    }
}

function addButtonLoadingStates() {
    // Add loading animation to all buttons with async operations
    const asyncButtons = document.querySelectorAll('.btn[data-async="true"]');
    
    asyncButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = `
                <span class="loading-spinner"></span>
                Loading...
            `;
            this.disabled = true;
            
            // Revert after 5 seconds if still loading
            setTimeout(() => {
                if (this.disabled) {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }
            }, 5000);
        });
    });
}

function addTooltips() {
    // Add tooltips to elements with data-tooltip attribute
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function(e) {
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.opacity = '0';
        });
        
        element.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.offsetX + 10) + 'px';
            tooltip.style.top = (e.offsetY - 30) + 'px';
        });
    });
}

// Utility functions for all pages
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.global-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'global-notification';
    notification.textContent = message;
    
    const backgroundColor = type === 'success' ? '#28a745' : 
                           type === 'error' ? '#dc3545' : 
                           type === 'warning' ? '#ffc107' : '#17a2b8';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('❌ Failed to copy', 'error');
    });
}

// Add global CSS for animations
const globalStyles = document.createElement('style');
globalStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading-spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid #ffffff;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .tooltip {
        position: absolute;
        background: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }
`;
document.head.appendChild(globalStyles);

// Performance monitoring
let pageLoadTime = Date.now();
window.addEventListener('load', () => {
    pageLoadTime = Date.now() - pageLoadTime;
    console.log(`Page loaded in ${pageLoadTime}ms`);
});

// Error tracking
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
