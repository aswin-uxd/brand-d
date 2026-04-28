document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Simple, clean reveal animations for minimal design
    gsap.utils.toArray('.section-header, .service-card, .tool-card, .step, .split-layout, .stats-grid, .glass-panel, .testimonial-card').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const endVal = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.innerText.replace(/[0-9]/g, '');
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            innerText: 0,
            duration: 1.5,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function() {
                stat.innerText = Math.round(this.targets()[0].innerText) + suffix;
            }
        });
    });

    // Chat Toggle Logic
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPanel = document.querySelector('.chat-panel');
    if(chatToggle && chatPanel) {
        chatToggle.addEventListener('click', () => {
            chatPanel.classList.toggle('active');
        });
    }

    initHeroCanvasAnimation();
});

function initHeroCanvasAnimation() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    const frameCount = 240;
    const currentFrame = index => `scrolldown/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    const images = [];
    let loadedImages = 0;
    let playhead = 0;
    let baseSpeed = 0.3; // Plays normally without interaction
    let scrollSpeed = 0;
    let targetScrollSpeed = 0;

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedImages++;
        };
        images.push(img);
    }

    // Scroll Velocity Logic
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        let delta = Math.abs(st - lastScrollTop);
        targetScrollSpeed = delta * 0.15; // Accelerate based on scroll distance
        lastScrollTop = st <= 0 ? 0 : st;
    }, { passive: true });

    function renderFrame(index) {
        if (images[index] && images[index].complete) {
            context.fillStyle = "#000000";
            context.fillRect(0, 0, canvas.width, canvas.height);
            
            const img = images[index];
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;
            
            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    }

    function loop() {
        // Smoothly interpolate scroll speed back to 0
        scrollSpeed += (targetScrollSpeed - scrollSpeed) * 0.1;
        targetScrollSpeed *= 0.9; // Decay
        
        let currentSpeed = baseSpeed + scrollSpeed;
        playhead += currentSpeed;
        
        if (playhead >= frameCount) {
            playhead = 0;
        }
        
        let frameIndex = Math.floor(playhead);
        renderFrame(frameIndex);
        
        requestAnimationFrame(loop);
    }
    
    // Start loop
    requestAnimationFrame(loop);
}

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            ScrollTrigger.refresh();
        }, 800); 
    }
});
