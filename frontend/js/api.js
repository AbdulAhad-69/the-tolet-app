const API_URL = '/api';

// Helper for generic fetches ensuring token is passed
async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Do not set Content-Type if sending FormData (browser handles the boundary automatically)
    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    
    return response.json();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}