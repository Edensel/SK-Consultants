// Security Configuration
const SECURITY_CONFIG = {
    maxFormSubmissions: 5,
    submissionWindowMs: 3600000, // 1 hour
    allowedEmailDomains: [], // Empty = allow all
    maxMessageLength: 5000,
    maxNameLength: 100,
    sanitizeInputs: true
};

// Rate limiting storage
let formSubmissionAttempts = [];

// Input sanitization function
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove any script tags and dangerous characters
    const sanitized = input
        .replace(/<script[^>]*>.*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .trim();
    
    // Prevent XSS by escaping special characters
    return escapeHtml(sanitized);
}

// HTML escape function
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length < 254;
}

// Rate limiting check
function checkRateLimit() {
    const now = Date.now();
    formSubmissionAttempts = formSubmissionAttempts.filter(
        timestamp => now - timestamp < SECURITY_CONFIG.submissionWindowMs
    );
    
    if (formSubmissionAttempts.length >= SECURITY_CONFIG.maxFormSubmissions) {
        return false; // Rate limit exceeded
    }
    
    formSubmissionAttempts.push(now);
    return true;
}

// CSRF Token generation
function generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Store CSRF token in session
if (!sessionStorage.getItem('csrfToken')) {
    sessionStorage.setItem('csrfToken', generateCSRFToken());
}

console.log('Security module loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing secure environment');

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

    // Supabase Integration (with security hardening)
    // Store credentials securely - should be in environment variables
    const SUPABASE_URL = 'https://xyzcompany.supabase.co';
    const SUPABASE_KEY = 'public-anon-key';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

    if (supabase) { // Safety check for Supabase
        const contactForm = document.querySelector('.corporate-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Rate limiting check
                if (!checkRateLimit()) {
                    alert('Too many submission attempts. Please try again later.');
                    return;
                }

                if (!supabase) {
                    alert('Supabase is not configured. Please add your API keys in script.js');
                    console.error('Supabase configuration missing');
                    return;
                }

                // Get form inputs
                const nameInput = contactForm.querySelector('input[type="text"]:first-child');
                const emailInput = contactForm.querySelector('input[type="email"]');
                const orgInput = contactForm.querySelector('input[placeholder*="Organization"]');
                const messageInput = contactForm.querySelector('textarea');
                const submitBtn = contactForm.querySelector('button[type="submit"]');

                // Validate form fields exist
                if (!nameInput || !emailInput || !orgInput || !messageInput || !submitBtn) {
                    console.error('Form structure invalid');
                    alert('Form structure error. Please refresh and try again.');
                    return;
                }

                // Get values
                const name = sanitizeInput(nameInput.value.trim());
                const email = sanitizeInput(emailInput.value.trim());
                const organization = sanitizeInput(orgInput.value.trim());
                const message = sanitizeInput(messageInput.value.trim());

                // Validation checks
                if (!name || name.length < 2 || name.length > SECURITY_CONFIG.maxNameLength) {
                    alert('Please enter a valid name (2-100 characters).');
                    nameInput.focus();
                    return;
                }

                if (!email || !isValidEmail(email)) {
                    alert('Please enter a valid email address.');
                    emailInput.focus();
                    return;
                }

                if (!organization || organization.length < 2) {
                    alert('Please enter your organization name.');
                    orgInput.focus();
                    return;
                }

                if (!message || message.length < 10 || message.length > SECURITY_CONFIG.maxMessageLength) {
                    alert('Message must be between 10 and 5000 characters.');
                    messageInput.focus();
                    return;
                }

                const originalBtnText = submitBtn.innerText;
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                const formData = {
                    name: name,
                    email: email,
                    organization: organization,
                    message: message,
                    submitted_at: new Date().toISOString(),
                    csrf_token: sessionStorage.getItem('csrfToken') // Include CSRF token
                };

                try {
                    const { data, error } = await supabase
                        .from('messages')
                        .insert([formData]);

                    if (error) {
                        console.error('Database error:', error);
                        throw new Error('Failed to send message. Please try again.');
                    }

                    alert('Thank you! Your message has been sent successfully. We will contact you soon.');
                    contactForm.reset();
                    
                    // Reset CSRF token after successful submission
                    sessionStorage.setItem('csrfToken', generateCSRFToken());
                } catch (error) {
                    console.error('Error sending message:', error.message);
                    alert('There was an error sending your message. Please try again later or contact us directly.');
                } finally {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
        }
    } else {
        console.warn('SK Consultants: Supabase URL or Anon Key is missing in script.js');
        console.warn('Please update script.js with your actual Supabase credentials to enable form submissions.');
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
