// Load property list dropdown from JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch("tolet-data.json")
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("propertyListDropdown");
            
            if (!dropdown) {
                console.error("Dropdown not found");
                return;
            }
            
            // Get unique divisions sorted alphabetically
            const divisions = [...new Set(data.properties.map(p => p.division))].sort();
            
            // Clear existing content
            dropdown.innerHTML = '';
            
            // Add "All Property" link
            const allLink = document.createElement('a');
            allLink.href = '#';
            allLink.textContent = 'All Property';
            allLink.onclick = (e) => {
                e.preventDefault();
                window.location.href = 'category-page.html?category=All';
            };
            dropdown.appendChild(allLink);
            
            // Add a separator
            const separator = document.createElement('hr');
            separator.style.margin = '8px 0';
            separator.style.border = 'none';
            separator.style.borderTop = '1px solid #ddd';
            dropdown.appendChild(separator);
            
            // Create links for each division
            divisions.forEach(division => {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = division;
                link.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = `category-page.html?division=${encodeURIComponent(division)}`;
                };
                dropdown.appendChild(link);
            });
        })
        .catch(error => console.error("Error loading property list:", error));
});
