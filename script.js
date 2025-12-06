// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
});

// create floating particles
function createParticles(){
    const particles=document.getElementById('particles');
    const particlesEmojis=['❤️','💕','💖','💝','💫','✨','🌸','🦋'];

    for(let i=0;i<30;i++){
        const particle=document.createElement('div');
        particle.className='particle';
        particle.innerHTML=particlesEmojis[Math.floor(Math.random()*particlesEmojis.length)];

        // random position
        particle.style.left=Math.random()*100+'%';
        particle.style.top=Math.random()*100+'%';

        // random animation duration and delay
        particle.style.animationDuration=(Math.random()*3*4)+'s';
        particle.style.animationDelay=(Math.random()*2)+'s';
        particles.appendChild(particle);
    }
}

// initialize typewriter and other animations
function initializeAnimations(){
    // typewriter effect is handled by CSS
    // add staggered animation delays to elements 
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.2) + 's';
    });
}

  // Reveal gallery on button click
  document.getElementById('startBtn').addEventListener('click', () => {
    const gallery = document.getElementById('gallery');
    gallery.classList.remove('hidden');

    // Trigger animations for title and cards
    const title = gallery.querySelector('.section-title');
    const cards = gallery.querySelectorAll('.photo-card');

    title.classList.add('aos-animate');
    cards.forEach((card, i) => {
      // Optional stagger for nicer effect
      card.style.transitionDelay = (i * 0.15) + 's';
      card.classList.add('aos-animate');
    });

    // Smooth scroll to the revealed section
    gallery.scrollIntoView({ behavior: 'smooth' });
  });




// scroll animations (AOS-animate on scroll)
function setupScrollAnimations(){
    const observerOptions={
        threshold:0.1,
        rootMargin:'0px 0px -50px 0px'
    };
function showGallery() {
  document.getElementById("gallery").style.display = "block";
}

    const observer=new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                entry.target.classList.add('aos-animate');
                // special handling for meassahe text
                if (entry.target.classList.contains('message-card')){
                    animateMessageText();
                }
            }
    });
},observerOptions);

// observe elements with scroll animations
const elementsToObserve = document.querySelectorAll('[data-aos], .section-title, .message-card');

elementsToObserve.forEach(element => {
    observer.observe(element);
    // add delay based on data-delay attribute
    const delay = element.getAttribute('data-delay');
    if (delay) {
        element.style.animationDelay = delay + 'ms';
    }
});
}

// animate message text with staggered effect
function animateMessageText(){
    const messageTexts = document.querySelectorAll('.message-text');
    messageTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('fade-in-animate');
        }, index * 500);
    });
}

// smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView(
            { behavior: 'smooth',
                block: 'start'
            });
    }
}

// toggle like functionality for photos
function toggleLike(button) {
    const heartIcon = button.querySelector('.heart-icon');
    button.classList.toggle('liked');
    if (button.classList.contains('liked')) {
        heartIcon.textContent = '❤️';
        // create floating heart effect
        createFloatingHearts();
    }else {
        heartIcon.textContent = '🤍';
    }
}

// create floating heart animation when photo is liked
function createFloatingHearts(event) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    const rect = button.getBoundingClientRect();
    heart.style.left = rect.left + 'px'
    heart.style.top = rect.top + 'px';
    document.body.appendChild(heart);
    // animate the heart
    heart.animate([
        {transform: 'translateY(0px) scale(1)', opacity: 1},
        {transform: 'translateY(-100px) scale(1.5)', opacity: 0}
    ], {
        duration: 1500,
        easing:'ease-out'
    }).onfinish = () => {
        document.body.removeChild(heart);
    };
}

// add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    const parallaxSpeed = 0.5;
    if (hero) {
        hero.style.transform = 'translateY($ (scrolled * parallaxSpeed)px)';
    }

    // update particle positions based on scroll
    const particles= document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.2 + (index % 3) * 0.1;
        particle.style.transform = 'translateY($(scrolled * speed)px)';
    });
});

// add mouse movement effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    // subtle movement effect
    const moveX = (x - 0.5) * 20;
    const moveY = (y - 0.5) * 20;
    const floatingHearts=document.querySelector('.floating-heart');
    if (floatingHearts){
        floatingHearts.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// add  click effect to buttons
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// add riple animation 
const style = document.createElement('style');
style.innerContent = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// add entrance animation for photos when they come into view
const photoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img) {
                img.style.animation = 'photoEnter 0.8s ease-out forwards';
            }
        }
    });
}, {threshold: 0.2});


// observe all photo cards
document.querySelectorAll('.photo-card').forEach(card => {
    photoObserver.observe(card);
});

// add photo enter animation
const photoStyle = document.createElement('style');
photoStyle.innerContent = `
@keyframes photoEnter {
    from {
        transform: scale(0.8) rotate(-5deg);
        opacity: 0;
    }
    to {
        transform: scale(1) rotate(0deg);  
        opacity: 1;
    }
}
`;
document.head.appendChild(photoStyle);