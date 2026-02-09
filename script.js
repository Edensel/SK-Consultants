console.log('Script.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    // Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Mobile styling for nav links
    const mobileNavStyles = document.createElement('style');
    mobileNavStyles.innerHTML = `
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
    document.head.appendChild(mobileNavStyles);


    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes
    document.querySelectorAll('section h2, .expertise-card, .stat-item, .profile-content, .contact-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
                console.log('Cookie Banner displayed');
            }, 2000);
        } else {
            console.log('Cookies already accepted');
        }
    } else {
        console.error('Cookie banner element not found!');
    }

    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) cookieBanner.classList.remove('show');
        });
    }

    // Mobile Dropdown Logic
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Supabase Integration
    // TODO: Replace with your actual project URL and Anon Key from Supabase Dashboard
    const SUPABASE_URL = 'https://xyzcompany.supabase.co';
    const SUPABASE_KEY = 'public-anon-key';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

    if (supabase) { // Safety check for Supabase
        const contactForm = document.querySelector('.corporate-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                if (!supabase) {
                    alert('Supabase is not configured. Please add your API keys in script.js');
                    return;
                }

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                const formData = {
                    name: contactForm.querySelector('input[type="text"]:first-child').value,
                    email: contactForm.querySelector('input[type="email"]').value,
                    organization: contactForm.querySelector('input[placeholder*="Organization"]').value,
                    message: contactForm.querySelector('textarea').value,
                    submitted_at: new Date()
                };

                try {
                    const { data, error } = await supabase
                        .from('messages')
                        .insert([formData]);

                    if (error) throw error;

                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } catch (error) {
                    console.error('Error sending message:', error);
                    alert('There was an error sending your message. Please try again.');
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    } else {
        console.warn('Supabase client not initialized. Contact form submission will not work.');
    }

    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;
    document.head.appendChild(animationStyles);

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

}); // End of DOMContentLoaded
