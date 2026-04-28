document.addEventListener('DOMContentLoaded', () => {
    
    // View Management
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const views = document.querySelectorAll('.content-area .view');
    
    function switchView(viewId) {
        // Update Nav Active State
        navItems.forEach(item => {
            if(item.getAttribute('data-view') === viewId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Show relevant view
        views.forEach(view => {
            if(view.id === `view-${viewId}`) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
    }

    // Sidebar Navigation Click
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = item.getAttribute('data-view');
            switchView(viewId);
        });
    });

    // Sub-navigation triggers
    const addProjectBtnTop = document.getElementById('btn-add-project');
    const addProjectBtnList = document.querySelector('.btn-add-project-link');
    const backBtns = document.querySelectorAll('.btn-back');

    if(addProjectBtnTop) {
        addProjectBtnTop.addEventListener('click', () => switchView('project-form'));
    }
    
    if(addProjectBtnList) {
        addProjectBtnList.addEventListener('click', () => switchView('project-form'));
    }

    backBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('projects'); // Go back to projects list
        });
    });

    // View All Projects from Dashboard
    const viewAllLink = document.querySelector('.view-all-projects');
    if(viewAllLink) {
        viewAllLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchView('projects');
        });
    }

    // Stat editing logic (inline edit simulation)
    const statInputs = document.querySelectorAll('.stat-edit-card .input-field');
    const statSaveBtns = document.querySelectorAll('.stat-edit-card .btn-primary');

    statInputs.forEach((input, index) => {
        const btn = statSaveBtns[index];
        if(btn) {
            btn.addEventListener('click', () => {
                const originalText = btn.innerText;
                btn.innerText = 'Saved!';
                btn.style.backgroundColor = 'var(--status-published)';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 1500);
            });
        }
    });

});
