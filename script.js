// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// Form submission handling
document.querySelector('.consultation-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!data.name || !data.email) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create email subject and body
    const subject = `CADvisor Consultation Request - ${data.service || 'General Inquiry'}`;
    const body = `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not specified'}
Service Interest: ${data.service || 'Not specified'}

Project Details:
${data.message || 'No additional details provided'}

---
Sent from CADvisor.xyz contact form
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:cadvisorconsulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show confirmation message
    alert('Thank you for your interest! Your email client should now open with a pre-filled message. Please send it to complete your consultation request.');

    // Reset form
    this.reset();
});

// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        // Add subtle animation feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.feature-item, .service-item, .highlight-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (for future enhancement)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    navToggle.style.display = 'none';
    navToggle.style.background = 'none';
    navToggle.style.border = 'none';
    navToggle.style.color = 'var(--text-primary)';
    navToggle.style.fontSize = '1.5rem';
    navToggle.style.cursor = 'pointer';

    document.querySelector('.nav-container').insertBefore(navToggle, document.querySelector('.nav-cta'));

    // Show/hide based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            navToggle.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }

    navToggle.addEventListener('click', function() {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.backgroundColor = 'var(--background-color)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1rem 2rem';
            navMenu.style.borderTop = '1px solid var(--border-color)';
        } else {
            navMenu.style.display = 'none';
        }
    });

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu on DOM load
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Add hover effects to cards
document.querySelectorAll('.feature-item, .service-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.1)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Typing animation for hero text (optional enhancement)
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary-color)';

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Uncomment to enable typing animation
// document.addEventListener('DOMContentLoaded', initTypingAnimation);

// Image Modal/Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close');
    const clickableImages = document.querySelectorAll('.clickable-image');

    console.log('Modal elements found:', {
        modal: !!modal,
        modalImage: !!modalImage,
        modalCaption: !!modalCaption,
        closeModal: !!closeModal,
        imageCount: clickableImages.length
    });

    // Add click event to all clickable images
    clickableImages.forEach((image, index) => {
        console.log(`Adding click handler to image ${index}:`, image.src);
        image.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Image clicked:', this.src);

            if (modal && modalImage) {
                modal.style.display = 'flex';
                modal.style.opacity = '1';
                modalImage.src = this.src;
                if (modalCaption) {
                    modalCaption.textContent = this.alt || 'RapidSurf Capability';
                }
                console.log('Modal should now be visible');
            } else {
                console.error('Modal elements not found');
            }
        });
    });

    // Close modal when clicking the X button
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            console.log('Close button clicked');
            closeModalFunction();
        });
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                console.log('Clicked outside image');
                closeModalFunction();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            console.log('Escape key pressed');
            closeModalFunction();
        }
    });

    // Function to close modal
    function closeModalFunction() {
        if (modal) {
            console.log('Closing modal');
            modal.style.display = 'none';
            modal.style.opacity = '0';
        }
    }
});
