// Global variable to store all properties
let allProperties = [];

// Load all properties on page load
fetch("tolet-data.json")
    .then(response => response.json())
    .then(data => {
        allProperties = data.properties;
        displayProperties(allProperties);
    })
    .catch(error => console.error("JSON Load Error:", error));

// Display properties in the grid
function displayProperties(properties) {
    const container = document.getElementById("featuredProperties");
    if (!container) {
        console.error("Container not found");
        return;
    }
    
    container.innerHTML = '';
    
    if (properties.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No properties found.</p>';
        return;
    }
    
    properties.forEach((property, index) => {
        const originalIndex = allProperties.indexOf(property);
        const card = document.createElement("div");
        card.className = "card";
        card.style.cursor = "pointer";
        card.onclick = () => {
            window.location.href = `property-details.html?id=${originalIndex}`;
        };
        // Include image if available
        const imgHtml = property.image ? `\n            <img src="${encodeURI(property.image)}" alt="${property.title}" style="width:100%;height:180px;object-fit:cover;border-radius:6px 6px 0 0;display:block;margin-bottom:10px;">` : '';

        card.innerHTML = `\n            ${imgHtml}
            <h3>${property.title}</h3>
            <p>📍 ${property.area}, ${property.division}</p>
            <p>💰 Rent: ৳${property.rent}</p>
            <p>🛏 Bedrooms: ${property.bedroom}</p>
            <button onclick="event.stopPropagation()">View Details</button>\n        `;
        container.appendChild(card);
    });
}

// Filter properties by category
function filterByCategory(category) {
    if (category === 'All') {
        displayProperties(allProperties);
    } else {
        const filtered = allProperties.filter(p => p.category === category);
        displayProperties(filtered);
    }
}

// Add click handlers to category buttons
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-bar button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent.trim();
            window.location.href = `category-page.html?category=${category}`;
        });
    });
});