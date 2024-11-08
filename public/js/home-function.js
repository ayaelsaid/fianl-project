const slides = document.querySelectorAll('#slider-images .slider img'); // Select all images
const dotsContainer = document.querySelector('.dots'); // Select dots container
let currentSlide = 0; // Track current slide index

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none'; // Show current slide only
    });
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index); // Add active class to current dot
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Move to the next slide
    showSlide(currentSlide);
}

// Create dots for each slide
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        currentSlide = index; // Set current slide to the clicked dot's index
        showSlide(currentSlide);
    });
    dotsContainer.appendChild(dot); // Append dot to dots container
});

// Automatically change slide every 3 seconds
setInterval(nextSlide, 3000);

// Initialize the first slide
showSlide(currentSlide);
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission


    window.location.href = '/';
});

