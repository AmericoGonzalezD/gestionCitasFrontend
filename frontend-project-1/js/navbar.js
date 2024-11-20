document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logoutButton');
    const userRole = localStorage.getItem('userRole'); // Assuming user role is stored in localStorage

    // Function to show/hide navbar links based on user role
    function updateNavbar() {
        const adminLinks = document.querySelectorAll('.admin-link');
        const userLinks = document.querySelectorAll('.user-link');

        if (userRole === 'admin') {
            adminLinks.forEach(link => link.style.display = 'block');
            userLinks.forEach(link => link.style.display = 'none');
        } else if (userRole === 'user') {
            adminLinks.forEach(link => link.style.display = 'none');
            userLinks.forEach(link => link.style.display = 'block');
        } else {
            adminLinks.forEach(link => link.style.display = 'none');
            userLinks.forEach(link => link.style.display = 'none');
        }
    }

    // Function to handle logout
    function handleLogout() {
        localStorage.removeItem('userRole'); // Clear user role
        window.location.href = 'login.html'; // Redirect to login page
    }

    // Event listener for logout button
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    updateNavbar(); // Initial call to update navbar visibility
});