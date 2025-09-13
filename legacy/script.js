// Authentication state management
let isAuthenticated = false;
let currentUser = null;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize authentication state
    initializeAuth();
    
    // Set up sign-in modal immediately
    setupSignInModal();
    
    // Test modal creation
    setTimeout(() => {
        const modal = document.getElementById('signInModal');
        console.log('Modal after setup:', modal);
    }, 100);
    
    // Navigation smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated counters for community impact stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('impact-stats')) {
                    animateCounters();
                }
                if (entry.target.classList.contains('step-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animatedElements = document.querySelectorAll('.impact-stats, .step-card, .testimonial-card');
    animatedElements.forEach(el => observer.observe(el));

    // Testimonials carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    };

    // Auto-advance testimonials
    setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.step-card, .testimonial-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Energy flow animation enhancement
    const energyFlow = document.querySelector('.energy-flow');
    if (energyFlow) {
        setInterval(() => {
            energyFlow.style.animation = 'none';
            setTimeout(() => {
                energyFlow.style.animation = 'energyFlow 3s ease-in-out infinite';
            }, 10);
        }, 6000);
    }

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.cursor = 'not-allowed';
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.cursor = 'pointer';
            }, 2000);
        });
    });

    // Mobile menu toggle (if needed)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <a href="#home" class="mobile-nav-link">Home</a>
            <a href="dashboard.html" class="mobile-nav-link">Dashboard</a>
            <a href="community.html" class="mobile-nav-link">Community</a>
            <div class="mobile-nav-actions">
                <button class="btn-login">Login</button>
                <button class="btn-signup">Sign Up</button>
            </div>
        `;
        
        navContainer.appendChild(mobileMenuBtn);
        document.body.appendChild(mobileMenu);
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Show/hide mobile menu based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                document.querySelector('.nav-menu').style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.nav-menu').style.display = 'flex';
                mobileMenu.classList.remove('active');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    createMobileMenu();
});

// Authentication Functions
function initializeAuth() {
    // Check if user is already authenticated (from localStorage)
    const savedAuth = localStorage.getItem('energyLinkAuth');
    if (savedAuth) {
        const authData = JSON.parse(savedAuth);
        isAuthenticated = authData.isAuthenticated;
        currentUser = authData.user;
    }
    
    // Update navigation based on auth state
    updateNavigation();
}

function updateNavigation() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    // Check if we're on the dashboard page
    const isDashboard = window.location.pathname.includes('dashboard.html');
    
    if (isDashboard && isAuthenticated) {
        // Hide navigation bar completely on dashboard
        if (navbar) {
            navbar.style.display = 'none';
        }
        return;
    } else {
        // Show navigation bar on other pages
        if (navbar) {
            navbar.style.display = 'block';
        }
    }
    
    if (!navMenu || !navActions) return;
    
    if (isAuthenticated) {
        // Show only Home and Community when signed in (not on dashboard)
        navMenu.innerHTML = `
            <a href="index.html" class="nav-link">Home</a>
            <a href="community.html" class="nav-link">Community</a>
        `;
        
        // Show user avatar with dropdown
        navActions.innerHTML = `
            <div class="user-avatar">
                <span>${currentUser ? currentUser.initials : 'U'}</span>
            </div>
            <div class="user-dropdown">
                <button class="dropdown-btn">▼</button>
                <div class="dropdown-menu">
                    <a href="dashboard.html">Dashboard</a>
                    <a href="#profile">Profile</a>
                    <a href="#settings">Settings</a>
                    <a href="#" onclick="signOut()">Sign Out</a>
                </div>
            </div>
        `;
    } else {
        // Show only Home and Community when signed out
        navMenu.innerHTML = `
            <a href="index.html" class="nav-link">Home</a>
            <a href="community.html" class="nav-link">Community</a>
        `;
        
        // Show sign in/up buttons
        navActions.innerHTML = `
            <button class="btn-login" onclick="showSignInModal()">Login</button>
            <button class="btn-signup" onclick="showSignInModal()">Sign Up</button>
        `;
    }
    
    // Re-attach event listeners
    attachNavigationListeners();
}

function setupSignInModal() {
    // Create sign-in modal if it doesn't exist
    if (!document.querySelector('#signInModal')) {
        console.log('Creating sign-in modal...');
        
        const modal = document.createElement('div');
        modal.id = 'signInModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content sign-in-popup">
                <div class="modal-header">
                    <h3>Join EnergyLink</h3>
                    <button class="modal-close" onclick="hideSignInModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="signInForm">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn-primary full-width">Sign In</button>
                        <div class="sign-up-link">
                            Don't have an account? <a href="#" onclick="showCreateAccount()">Create Account</a>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Initially hide the modal
        modal.style.display = 'none';
        modal.style.opacity = '0';
        
        document.body.appendChild(modal);
        
        // Add sign-in modal styles
        addSignInModalStyles();
        
        // Handle form submission
        const form = document.getElementById('signInForm');
        if (form) {
            form.addEventListener('submit', handleSignIn);
            console.log('Form event listener added');
        } else {
            console.error('Form not found!');
        }
        
        console.log('Sign-in modal created successfully');
    } else {
        console.log('Sign-in modal already exists');
    }
}

function addSignInModalStyles() {
    const styles = `
        .sign-in-popup {
            max-width: 350px;
            width: 90%;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            transition: transform 0.3s ease-out;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .modal-overlay.show .sign-in-popup {
            transform: scale(1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .modal-header {
            padding: 20px 25px 15px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--deep-forest);
            font-family: var(--font-heading);
            font-size: 20px;
            font-weight: 700;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-close:hover {
            color: #333;
        }
        
        .modal-body {
            padding: 25px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--deep-forest);
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #eee;
            border-radius: 8px;
            font-size: 16px;
            transition: var(--transition);
        }
        
        .form-group input:focus {
            outline: none;
            border-color: var(--primary-green);
        }
        
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        
        .checkbox-label {
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
            color: #666;
        }
        
        .checkbox-label input[type="checkbox"] {
            display: none;
        }
        
        .checkmark {
            width: 18px;
            height: 18px;
            border: 2px solid #ddd;
            border-radius: 4px;
            margin-right: 8px;
            position: relative;
            transition: var(--transition);
        }
        
        .checkbox-label input[type="checkbox"]:checked + .checkmark {
            background: var(--primary-green);
            border-color: var(--primary-green);
        }
        
        .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 12px;
            font-weight: bold;
        }
        
        .forgot-password {
            color: var(--primary-green);
            text-decoration: none;
            font-size: 14px;
        }
        
        .forgot-password:hover {
            text-decoration: underline;
        }
        
        .btn-primary.full-width {
            width: 100%;
            margin-bottom: 20px;
        }
        
        .sign-up-link {
            text-align: center;
            color: #666;
        }
        
        .sign-up-link a {
            color: var(--primary-green);
            text-decoration: none;
        }
        
        .sign-up-link a:hover {
            text-decoration: underline;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = styles;
    document.head.appendChild(style);
}

function showSignInModal() {
    console.log('showSignInModal called');
    const modal = document.getElementById('signInModal');
    console.log('Modal element:', modal);
    
    if (modal) {
        console.log('Showing modal...');
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.animation = 'fadeIn 0.3s ease-out';
        
        // Trigger scale animation
        setTimeout(() => {
            modal.classList.add('show');
            console.log('Modal should now be visible');
        }, 10);
    } else {
        console.error('Sign-in modal not found! Creating it now...');
        setupSignInModal();
        // Try again after creating
        setTimeout(() => {
            showSignInModal();
        }, 100);
    }
}

function hideSignInModal() {
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate authentication (in real app, this would call an API)
    if (email && password) {
        // Create user object
        currentUser = {
            email: email,
            initials: email.charAt(0).toUpperCase() + email.split('@')[0].charAt(1).toUpperCase(),
            name: email.split('@')[0]
        };
        
        // Set authenticated state
        isAuthenticated = true;
        
        // Save to localStorage
        localStorage.setItem('energyLinkAuth', JSON.stringify({
            isAuthenticated: true,
            user: currentUser
        }));
        
        // Update navigation
        updateNavigation();
        
        // Hide modal with smooth transition
        hideSignInModal();
        
        // Show success message
        showNotification('Welcome to EnergyLink!', 'success');
        
        // Add smooth transition to dashboard
        setTimeout(() => {
            // Add page transition effect
            document.body.style.transition = 'opacity 0.5s ease-out';
            document.body.style.opacity = '0.7';
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 300);
        }, 500);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function signOut() {
    // Clear authentication state
    isAuthenticated = false;
    currentUser = null;
    
    // Clear localStorage
    localStorage.removeItem('energyLinkAuth');
    
    // Show message
    showNotification('You have been signed out', 'info');
    
    // Add smooth transition back to home
    document.body.style.transition = 'opacity 0.5s ease-out';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        // Update navigation
        updateNavigation();
        
        // Redirect to home
        window.location.href = 'index.html';
    }, 300);
}

function showCreateAccount() {
    // For now, just show the sign-in form
    // In a real app, this would switch to a registration form
    showNotification('Account creation coming soon!', 'info');
}

function testModal() {
    console.log('Test modal function called');
    const modal = document.getElementById('signInModal');
    console.log('Modal in test:', modal);
    
    if (modal) {
        console.log('Modal exists, showing...');
        showSignInModal();
    } else {
        console.log('Modal does not exist, creating...');
        setupSignInModal();
        setTimeout(() => {
            showSignInModal();
        }, 100);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#219653',
        error: '#F3722C',
        info: '#219653'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function attachNavigationListeners() {
    // Re-attach smooth scrolling to new nav links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Re-attach dropdown functionality
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        document.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
        });
    }
}

// Add CSS for mobile menu
const mobileMenuCSS = `
    .mobile-menu-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--deep-forest);
    }
    
    .mobile-menu {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        z-index: 999;
        padding: 20px;
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
    
    .mobile-nav-link {
        display: block;
        padding: 15px 0;
        text-decoration: none;
        color: var(--deep-forest);
        font-weight: 500;
        border-bottom: 1px solid #eee;
    }
    
    .mobile-nav-actions {
        margin-top: 20px;
        display: flex;
        gap: 10px;
    }
    
    .mobile-nav-actions .btn-login,
    .mobile-nav-actions .btn-signup {
        flex: 1;
        padding: 12px;
        font-size: 14px;
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Add fadeInUp animation
const fadeInUpCSS = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = fadeInUpCSS;
document.head.appendChild(fadeInUpStyle);
