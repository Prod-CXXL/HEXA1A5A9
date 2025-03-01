// Function to load HTML content
function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Load header and footer
loadHTML('partials/header.html', 'header-placeholder');
loadHTML('partials/footer.html', 'footer-placeholder');

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