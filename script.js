document.addEventListener('DOMContentLoaded', () => {

    async function fetchProjects() {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Could not fetch projects:', error);
            return null;
        }
    }
    function renderProjects(projects) {
        const grid = document.getElementById('destinations-grid');
        if (!grid) return;
        grid.innerHTML = '';
        projects.forEach(project => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 mb-4';
            col.innerHTML = `
                <div class="card">
                    <img src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <a href="#" class="btn btn-primary">Learn More</a>
                    </div>
                </div>
            `;
            grid.appendChild(col);
        });
    }
    async function init() {
        const projects = await fetchProjects();
        const grid = document.getElementById('destinations-grid');
        if (projects) {
            renderProjects(projects);
        } else {
             if (grid) {
                grid.innerHTML = `<p style="text-align: center; color: red; grid-column: 1 / -1;">Error: Could not load destination data. Please ensure you are running this on a live server.</p>`;
            }
        }
    }
    init();
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navCollapse, {toggle: false});
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                if (navCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            }
        });
    });
});
