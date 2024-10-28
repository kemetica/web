// router.js
document.addEventListener("DOMContentLoaded", function() {
    const routes = {
        'home': 'index.html',
        'about': 'about.html',
        'privacy': 'privacy.html',
        'help': 'help.html',
        'feedback': 'feedback.html'
    };

    function loadPage(page) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', routes[page], true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                document.getElementById('content').innerHTML = xhr.responseText;
            } else {
                document.getElementById('content').innerHTML = '<h2>Page not found</h2>';
            }
        };
        xhr.send();
    }

    // Handle initial load
    const path = window.location.pathname.split('/').pop().split('.')[0];
    loadPage(path || 'home'); // Default to home

    // Handle navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href');
            history.pushState(null, '', page); // Change URL without reloading
            loadPage(page);
        });
    });

    // Handle back/forward navigation
    window.onpopstate = function() {
        loadPage(window.location.pathname.split('/').pop().split('.')[0]);
    };
});
