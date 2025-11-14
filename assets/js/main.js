// Common JavaScript for all pages
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
});

function checkSharedResults() {
    const path = window.location.pathname;
    const parts = path.split('/');
    
    if (parts.length >= 3) {
        const tool = parts[1];
        const result = decodeURIComponent(parts[2]);
        
        switch(tool) {
            case 'number':
                document.getElementById('numberInput').value = result;
                document.getElementById('getNumberInfo').click();
                break;
            case 'device':
                // Device info is auto-generated, just show results
                document.getElementById('getDeviceInfo').click();
                break;
            case 'ip':
                document.getElementById('ipInput').value = result;
                document.getElementById('getIpInfo').click();
                break;
        }
        
        // Clean URL without reload
        window.history.replaceState({}, document.title, '/' + tool);
    }
}
