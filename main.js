document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initHeroCanvasAnimation();
    initScrollAnimations();
});

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 1200); // 1.2s delay to show the logo animation
    }
});

function initHeroCanvasAnimation() {
    const canvas = document.getElementById("hero-canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas dimensions
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener("resize", resize);
    resize();
    
    const totalFrames = 240; 
    const images = [];
    
    // Preload frames
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const num = i.toString().padStart(3, '0');
        img.src = `scrolldown/ezgif-frame-${num}.jpg`;
        images.push(img);
    }
    
    let currentFrame = 0;
    let baseSpeed = 0.3; // Slow, smooth base speed
    let speed = baseSpeed;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    
    // Passive scroll listener for velocity
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        // Calculate scroll delta
        const delta = currentScrollY - lastScrollY;
        scrollVelocity = delta;
        lastScrollY = currentScrollY;
    }, { passive: true });
    
    function render() {
        // Decay scroll velocity to ease back to base speed when scrolling stops
        scrollVelocity *= 0.9;
        
        // Calculate speed using scroll delta
        const factor = 0.08;
        speed = baseSpeed + Math.abs(scrollVelocity) * factor;
        
        // Clamp to prevent excessive speed
        speed = Math.min(speed, 6);
        
        // Seamless loop formula
        currentFrame = (currentFrame + speed) % totalFrames;
        
        // Ensure we handle negative indices safely just in case
        if (currentFrame < 0) currentFrame += totalFrames;
        
        const imgIndex = Math.floor(currentFrame);
        const img = images[imgIndex];
        
        if (img && img.complete && img.naturalWidth > 0) {
            // Calculate dimensions for object-cover
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;
            
            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
        
        requestAnimationFrame(render);
    }
    
    // Start animation loop
    render();

    // Hero Content slight upward motion (SEO friendly, no fade out)
    gsap.to(".hero-content", {
        scrollTrigger: {
            trigger: ".section-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: -40,
        ease: "none"
    });
    
    gsap.to(".hero-background", {
        scrollTrigger: {
            trigger: ".section-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        scale: 1, // scales down from 1.05 to 1
        ease: "none"
    });
}

function initScrollAnimations() {
    // Reveal headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Reveal Service Cards
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // Reveal Process Steps
    gsap.from(".step", {
        scrollTrigger: {
            trigger: ".process-steps",
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Parallax Mockup
    gsap.from(".mockup-container", {
        scrollTrigger: {
            trigger: ".section-casestudy",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        },
        y: 100,
        ease: "none"
    });

    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        const endVal = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.innerText.replace(/[0-9]/g, '');
        
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power3.out",
            onUpdate: function() {
                // Ensure suffix is preserved
                stat.innerText = Math.round(this.targets()[0].innerText) + suffix;
            }
        });
    });
}
