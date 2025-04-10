// Function to load HTML content
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.querySelector('.overlay');
    const mainContent = document.querySelector('.main-content');
    const floatBtn = document.querySelector('.float-btn-container');

    function toggleMenu(show) {
        if (!sideMenu || !overlay || !mainContent || !floatBtn) return;
        
        if (show) {
            sideMenu.classList.add('open');
            overlay.classList.add('show');
            mainContent.classList.add('blur');
            floatBtn.classList.add('menu-open'); // Add this line
        } else {
            sideMenu.classList.remove('open');
            overlay.classList.remove('show');
            mainContent.classList.remove('blur');
            floatBtn.classList.remove('menu-open'); // Add this line
        }
    }

    // Ensure menu is closed on page load
    toggleMenu(false);

    // Add click handlers
    if (menuButton) {
        menuButton.addEventListener('click', () => toggleMenu(true));
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', () => toggleMenu(false));
    }
    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(false));
    }

// Poem Toggles

var coll = document.getElementsByClassName("poem-title");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            // Close all other open contents
            var allContents = document.getElementsByClassName("content");
            var allButtons = document.getElementsByClassName("poem-title");
            for (var j = 0; j < allContents.length; j++) {
                if (allContents[j] !== this.nextElementSibling) {
                    allContents[j].style.display = "none";
                    allButtons[j].classList.remove("active");
                }
            }

            // Toggle the clicked content
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                this.classList.remove("active");
            } else {
                content.style.display = "block";
                this.classList.add("active");

            // Scroll to the content
            //content.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    }

    // Top bar scroll effect
    const topBar = document.querySelector('.top-bar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    });

    // Info Button
    const floatInfoBtn = document.querySelector('.material-symbols.float-btn');
    
    floatInfoBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });

// Search functionality
const searchInput = document.getElementById('site-search');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('search-results');

if (searchInput && searchButton && resultsContainer) {
    // Auto-search if URL has search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        searchInput.value = searchQuery;
        performSearch(searchQuery);
    }

    // Search event handlers
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

async function performSearch(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return;

    resultsContainer.innerHTML = '<p>Searching...</p>';

    try {
        const pagePaths = [
            '/HEXA1A5A9/',
            '/HEXA1A5A9/tune/',
            '/HEXA1A5A9/rhyme/',
            '/HEXA1A5A9/prose/',
            '/HEXA1A5A9/design/',
            '/HEXA1A5A9/connect/',
            '/HEXA1A5A9/blog/',
            '/HEXA1A5A9/shop/'
        ];

        const results = [];

        for (const path of pagePaths) {
            try {
                const response = await fetch(path);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('.main-content');

                if (content) {
                    const text = content.textContent.toLowerCase();
                    const searchTermLower = searchTerm.toLowerCase();

                    if (text.includes(searchTermLower)) {
                        const index = text.indexOf(searchTermLower);
                        results.push({
                            title: doc.title || path,
                            url: path,
                            excerpt: text.substring(
                                Math.max(0, index - 50),
                                Math.min(text.length, index + searchTerm.length + 50)
                            )
                        });
                    }
                }
            } catch (error) {
                console.warn(`Failed to search ${path}:`, error);
            }
        }

        displayResults(results);
    } catch (error) {
        resultsContainer.innerHTML = '<p>Search failed. Please try again.</p>';
        console.error('Search error:', error);
    }
}

function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    resultsContainer.innerHTML = results.map(result => `
        <div class="result-item">
            <h3><a href="${result.url}">${result.title}</a></h3>
            <p>...${result.excerpt}...</p>
        </div>
    `).join('');
}
});

// Info Button Info
async function getLastUpdate() {
    try {
        // Replace with your GitHub repository details
        const username = 'PROD-CXXL';
        const repo = 'HEXA1A5A9';
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const commits = await response.json();
        const lastUpdate = new Date(commits[0].commit.committer.date);
        
        const formattedDate = lastUpdate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        const formattedTime = lastUpdate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const author = commits[0].commit.author.name;
        
        const updateText = document.querySelector('.update-text');
        updateText.innerHTML = `Last Updated ${formattedDate} @ ${formattedTime} <span class="separator">|</span> <span class="author">${author}</span>`;
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.querySelector('.update-text').textContent = 'Update info unavailable';
    }

}

document.addEventListener('DOMContentLoaded', getLastUpdate);