// ===== SECTION SWITCHING =====
const sections = document.querySelectorAll('.container');
const controls = document.querySelectorAll('.control');

controls.forEach(control => {
    control.addEventListener('click', () => {
        const targetId = control.getAttribute('data-id');

        // Remove active from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active-btn from all controls
        controls.forEach(btn => {
            btn.classList.remove('active-btn');
        });

        // Activate the clicked control
        control.classList.add('active-btn');

        // Activate the matching section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== THEME TOGGLE =====
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    // Persist preference
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});
