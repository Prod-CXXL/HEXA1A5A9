// Function to load HTML content
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

const menuButton = document.getElementById('menuButton');

// Menu button
if (menuButton) {
    menuButton.addEventListener('click', function() {
        document.getElementById("menuButton").addEventListener("click", function() {
            document.getElementById("sideMenu").classList.add("open");
        });
        
        document.getElementById("closeMenu").addEventListener("click", function() {
            document.getElementById("sideMenu").classList.remove("open");
        });            
    });
}

document.addEventListener("DOMContentLoaded", function() {
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
});

document.addEventListener('DOMContentLoaded', function() {
    const topBar = document.querySelector('.top-bar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    });
});

async function getLastUpdate() {
    try {
        // Replace with your GitHub repository details
        const username = 'PROD-CXXL';
        const repo = 'Jekyll-Test';
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

document.addEventListener('DOMContentLoaded', function() {
    const floatBtn = document.querySelector('.material-symbols.float-btn');
    
    floatBtn.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});