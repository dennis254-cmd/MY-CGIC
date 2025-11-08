// Sticky nav highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 110;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Fade-in animations on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Image slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const showSlide = idx => {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
};
const nextSlide = () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
};
const prevSlide = () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
};
document.querySelector('.next').onclick = nextSlide;
document.querySelector('.prev').onclick = prevSlide;
setInterval(nextSlide, 5000);

// Header presentation slides
const presentationSlides = document.querySelectorAll('.presentation-slide');
let presSlide = 0;
function showPresSlide(idx) {
  presentationSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}
setInterval(() => {
  presSlide = (presSlide + 1) % presentationSlides.length;
  showPresSlide(presSlide);
}, 3500);

// Modal Login/Register
const modal = document.getElementById('modal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');
const tabLogin = document.getElementById('tabLogin');
const tabRegister = document.getElementById('tabRegister');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginBtn.onclick = () => { modal.style.display = 'flex'; }
closeModal.onclick = () => { modal.style.display = 'none'; }
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

tabLogin.onclick = () => {
  tabLogin.classList.add('active');
  tabRegister.classList.remove('active');
  loginForm.style.display = 'flex';
  registerForm.style.display = 'none';
};
tabRegister.onclick = () => {
  tabRegister.classList.add('active');
  tabLogin.classList.remove('active');
  loginForm.style.display = 'none';
  registerForm.style.display = 'flex';
};

// Contact form message (no backend, just UI feedback)
const contactForm = document.getElementById('contactForm');
contactForm.onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('formMsg').textContent = 'Thank you! Your message has been received.';
  contactForm.reset();
  setTimeout(() => {
    document.getElementById('formMsg').textContent = '';
  }, 5000);
};