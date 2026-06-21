let allProperties = [];

// Fetch properties from MongoDB via Express API
async function loadHomeProperties() {
    try {
        const response = await fetch("/api/properties");
        if (!response.ok) throw new Error("Failed to fetch API");
        
        const properties = await response.json();
        allProperties = properties;
        displayProperties(allProperties);
    } catch (error) {
        console.error("Database Load Error:", error);
        document.getElementById("featuredProperties").innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Could not load properties from the database.</p>';
    }
}

function displayProperties(properties) {
    const container = document.getElementById("featuredProperties");
    if (!container) return;
    
    container.innerHTML = '';
    
    if (properties.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No properties found.</p>';
        return;
    }
    
    // Show only the latest 6 properties on the homepage
    const featured = properties.slice(0, 6);
    
    featured.forEach((property) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.cursor = "pointer";
        
        // Use MongoDB _id instead of array index
        card.onclick = () => { window.location.href = `property-details.html?id=${property._id}`; };
        
        // imageUrl will come directly from Cloudinary via your API
        const imgHtml = property.imageUrl 
            ? `<img src="${property.imageUrl}" alt="${property.title}" style="width:100%;height:180px;object-fit:cover;border-radius:6px 6px 0 0;display:block;margin-bottom:10px;">` 
            : '';

        card.innerHTML = `
            ${imgHtml}
            <h3>${property.title}</h3>
            <p>📍 ${property.area}, ${property.division}</p>
            <p>💰 Rent: ৳${property.rent}</p>
            <p>🛏 Bedrooms: ${property.bedroom}</p>
            <button onclick="event.stopPropagation()">View Details</button>
        `;
        container.appendChild(card);
    });
}

// Add click handlers to category buttons
document.addEventListener('DOMContentLoaded', function() {
    loadHomeProperties();

    const categoryButtons = document.querySelectorAll('.category-bar button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent.trim();
            window.location.href = `category-page.html?category=${category}`;
        });
    });
});