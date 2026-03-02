/* ========================================
   STAR-FIELD CANVAS
   ======================================== */
(function () {
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let shootingStars = [];
  const STAR_COUNT = 320;
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function createStar() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      dAlpha: (Math.random() - 0.5) * 0.008,
    };
  }

  function maybeSpawnShootingStar() {
    if (Math.random() < 0.003 && shootingStars.length < 2) {
      shootingStars.push({
        x: Math.random() * w * 0.8,
        y: Math.random() * h * 0.4,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        alpha: 1,
      });
    }
  }

  function init() {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw nebula glow
    const grd = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.55);
    grd.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
    grd.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (const s of stars) {
      s.alpha += s.dAlpha;
      if (s.alpha <= 0.15 || s.alpha >= 0.85) s.dAlpha *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226, 232, 240, ${s.alpha})`;
      ctx.fill();
    }

    // Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.4);
      ctx.strokeStyle = `rgba(167, 139, 250, ${ss.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ss.x += ss.speed;
      ss.y += ss.speed * 0.4;
      ss.alpha -= 0.015;
      if (ss.alpha <= 0) shootingStars.splice(i, 1);
    }

    maybeSpawnShootingStar();
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) stars.push(createStar());
  });

  init();
  draw();
})();

/* ========================================
   NAVBAR SCROLL STYLE
   ======================================== */
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

/* ========================================
   MOBILE NAV TOGGLE
   ======================================== */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  // Close menu on link click
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
})();

/* ========================================
   FADE-IN ON SCROLL (IntersectionObserver)
   ======================================== */
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();
