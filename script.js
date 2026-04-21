document.addEventListener('DOMContentLoaded', () => {
    // ======== Sticky Navbar ========
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ======== Mobile Menu Toggle ========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if(icon) icon.classList.replace('bx-x', 'bx-menu');
        });
    });

    // ======== Gallery Slider ========
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if(slider && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });

        // Auto slide every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
    // ======== Cart & Toast Notifications ========
    let cartCount = 0;
    const cartBadge = document.getElementById('cart-badge');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, iconClass = 'bx-check-circle') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class='bx ${iconClass}'></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    }

    // Add to cart buttons
    document.querySelectorAll('.bx-cart-add').forEach(icon => {
        const btn = icon.parentElement;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Small animation on cart icon
            const cartBtn = document.getElementById('cart-btn');
            if (cartBtn) {
                cartBtn.style.transform = 'scale(1.2)';
                setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
            }
            
            showToast('Item added to cart!');
        });
    });

    // Favorite buttons
    document.querySelectorAll('.bx-heart').forEach(icon => {
        const btn = icon.parentElement;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(icon.classList.contains('bx-heart')) {
                icon.classList.replace('bx-heart', 'bxs-heart');
                icon.style.color = 'var(--primary-color)';
                showToast('Added to wishlist!', 'bxs-heart');
            } else {
                icon.classList.replace('bxs-heart', 'bx-heart');
                icon.style.color = '';
                showToast('Removed from wishlist!', 'bx-heart');
            }
        });
    });
});
