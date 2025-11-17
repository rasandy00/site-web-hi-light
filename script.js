/* Globals & helpers */
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  /* BURGER menu */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    // simple animated menu for mobile
    if (open) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '66px';
      nav.style.background = 'rgba(255,255,255,0.98)';
      nav.style.padding = '12px';
      nav.style.borderRadius = '12px';
      nav.style.boxShadow = '0 12px 30px rgba(90,70,51,0.08)';
      setTimeout(()=>nav.classList.add('in-view'),20);
    } else {
      nav.classList.remove('in-view');
      setTimeout(()=>{nav.style.display='none'},250);
    }
  });

  /* HERO parallax (light) */
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    // gentle parallax: scale a bit & translateY slightly
    heroBg.style.transform = `translateY(${sc * -0.08}px) scale(${1 + sc * 0.0006})`;
  }, {passive:true});

  /* LOGO shine on load */
  const logo = document.getElementById('logo');
  setTimeout(()=> {
    logo.classList.add('shine');
    setTimeout(()=> logo.classList.remove('shine'), 1600);
  }, 500);

  /* Intersection Observer - reveal on scroll */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // once revealed, unobserve for perf
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  /* Simple testimonial carousel */
  const slidesWrap = document.querySelector('.slides');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let idx = 0;
  const total = slides.length;

  function showSlide(i) {
    idx = (i + total) % total;
    slidesWrap.style.transform = `translateX(${-idx * 100}%)`;
  }
  prevBtn.addEventListener('click', () => showSlide(idx - 1));
  nextBtn.addEventListener('click', () => showSlide(idx + 1));

  // autoplay
  let auto = setInterval(()=> showSlide(idx + 1), 4200);
  // pause on hover
  const carousel = document.getElementById('carousel');
  carousel.addEventListener('mouseenter', ()=> clearInterval(auto));
  carousel.addEventListener('mouseleave', ()=> auto = setInterval(()=> showSlide(idx + 1), 4200));

  /* Smooth scroll for internal links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // close nav on mobile if open
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        nav.style.display = 'none';
      }
    });
  });

});
