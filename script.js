/* ============================
   SCRIPT.JS — Carta de Aniversario
   ============================ */

// ──────────────────────────────
// PARTÍCULAS EN LA PORTADA
// ──────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    '#e8436a', '#f48fb1', '#d4a017', '#ffe082',
    '#c0164a', '#fff', '#ff80ab', '#ffd740'
  ];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.width = (Math.random() * 6 + 3) + 'px';
    p.style.height = p.style.width;
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    p.style.opacity = (Math.random() * 0.6 + 0.3).toString();
    container.appendChild(p);
  }
}

// ──────────────────────────────
// ABRIR LA CARTA
// ──────────────────────────────
let isOpening = false;

function openLetter() {
  if (isOpening) return;
  isOpening = true;

  const envelopeScreen = document.getElementById('envelope-screen');
  const letterScreen = document.getElementById('letter-screen');
  const topFlap = document.querySelector('.top-flap');
  const seal = document.getElementById('envelopeSeal');
  const btn = document.getElementById('openBtn');

  // Ocultar botón y sello, abrir solapa
  btn.style.opacity = '0';
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    topFlap.classList.add('open');
    seal.style.animation = 'none';
    seal.style.opacity = '0';
  }, 200);

  // Desvanecer pantalla del sobre
  setTimeout(() => {
    envelopeScreen.classList.add('closing');
  }, 1200);

  // Mostrar carta
  setTimeout(() => {
    envelopeScreen.style.display = 'none';
    letterScreen.style.display = 'flex';
    letterScreen.classList.add('opening');
    createFallingPetals();
    goToPage(1);
  }, 2200);
}

// ──────────────────────────────
// PÉTALOS CAYENDO
// ──────────────────────────────
function createFallingPetals() {
  const container = document.getElementById('fallingPetals');
  const emojis = ['🌸', '🌹', '💕', '💖', '🌺', '✨', '💗', '⭐'];

  for (let i = 0; i < 25; i++) {
    const petal = document.createElement('div');
    petal.className = 'falling-petal';
    petal.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    petal.style.opacity = (Math.random() * 0.5 + 0.3).toString();
    container.appendChild(petal);
  }
}

// ──────────────────────────────
// NAVEGACIÓN ENTRE PÁGINAS
// ──────────────────────────────
let currentPage = 1;

function goToPage(pageNum) {
  // Ocultar página actual
  const current = document.getElementById('page' + currentPage);
  if (current) {
    current.classList.add('hidden');
    current.classList.remove('page-enter');
  }

  currentPage = pageNum;

  // Mostrar nueva página
  const next = document.getElementById('page' + pageNum);
  if (next) {
    next.classList.remove('hidden');
    // Forzar reflow para reiniciar animación
    void next.offsetWidth;
    next.classList.add('page-enter');
  }

  // Actualizar navegación
  document.querySelectorAll('.nav-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === pageNum);
  });

  // Efectos especiales por página
  if (pageNum === 3) {
    setTimeout(launchPage3Effects, 400);
  }

  // Scroll al inicio de la página
  if (next) next.scrollTop = 0;
}

// ──────────────────────────────
// EFECTOS PÁGINA 3
// ──────────────────────────────
function launchPage3Effects() {
  createConfetti();
  setTimeout(createHeartsExplosion, 500);
  setTimeout(createFireworks, 1000);
  setTimeout(createFireworks, 2500);
  setTimeout(createFireworks, 4000);
}

function createConfetti() {
  const wrap = document.getElementById('confettiWrap');
  if (!wrap) return;
  wrap.innerHTML = '';

  const colors = [
    '#e8436a', '#d4a017', '#f48fb1', '#ffe082',
    '#c0164a', '#fff', '#ff80ab', '#ffd740',
    '#7c4dff', '#00bcd4', '#4caf50', '#ff5722'
  ];

  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.width = (Math.random() * 12 + 6) + 'px';
    c.style.height = (Math.random() * 12 + 6) + 'px';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.borderRadius = Math.random() > 0.4 ? '50%' : '2px';
    c.style.animationDuration = (Math.random() * 4 + 3) + 's';
    c.style.animationDelay = (Math.random() * 3) + 's';
    c.style.animationIterationCount = '3';
    wrap.appendChild(c);
  }
}

function createHeartsExplosion() {
  const container = document.getElementById('heartsExplosion');
  if (!container) return;
  container.innerHTML = '';

  const hearts = ['💕', '💖', '💗', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'heart-pop';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = (30 + Math.random() * 40) + '%';
    h.style.top = (30 + Math.random() * 40) + '%';
    h.style.setProperty('--tx', (Math.random() * 200 - 100) + 'px');
    h.style.setProperty('--ty', (Math.random() * 200 - 100) + 'px');
    h.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    h.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
    h.style.animationDelay = (Math.random() * 0.5) + 's';
    container.appendChild(h);

    // Limpiar después
    h.addEventListener('animationend', () => h.remove());
  }
}

function createFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;

  const colors = ['#e8436a', '#d4a017', '#f48fb1', '#ffe082', '#fff', '#ff80ab'];
  const cx = 20 + Math.random() * 60; // porcentaje X
  const cy = 10 + Math.random() * 40; // porcentaje Y

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('div');
    p.className = 'firework-particle';
    p.style.left = cx + '%';
    p.style.top = cy + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.width = (Math.random() * 8 + 4) + 'px';
    p.style.height = p.style.width;

    const angle = (i / 24) * Math.PI * 2;
    const dist = 60 + Math.random() * 80;
    p.style.setProperty('--fx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--fy', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = (Math.random() * 0.8 + 0.6) + 's';
    p.style.animationDelay = (Math.random() * 0.2) + 's';

    container.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

// ──────────────────────────────
// REINICIAR
// ──────────────────────────────
function restartLetter() {
  const envelopeScreen = document.getElementById('envelope-screen');
  const letterScreen = document.getElementById('letter-screen');
  const topFlap = document.querySelector('.top-flap');
  const seal = document.getElementById('envelopeSeal');
  const btn = document.getElementById('openBtn');

  // Resetear páginas
  document.querySelectorAll('.letter-page').forEach((p, i) => {
    p.classList.toggle('hidden', i !== 0);
    p.classList.remove('page-enter');
  });
  currentPage = 1;

  // Resetear sobre
  topFlap.classList.remove('open');
  seal.style.animation = '';
  seal.style.opacity = '1';
  btn.style.opacity = '1';
  btn.style.pointerEvents = '';
  isOpening = false;

  // Ocultar carta, mostrar sobre
  letterScreen.style.display = 'none';
  letterScreen.classList.remove('opening');
  envelopeScreen.style.display = 'flex';
  envelopeScreen.classList.remove('closing');

  // Limpiar efectos
  document.getElementById('fallingPetals').innerHTML = '';
}

// ──────────────────────────────
// MÚSICA TOGGLE
// ──────────────────────────────
function toggleMusic() {
  const video = document.getElementById('localVideo');
  const btn = document.getElementById('musicToggle');
  if (!video) return;

  if (video.paused) {
    video.play().then(() => {
      if (btn) {
        btn.textContent = '🔊';
        btn.classList.add('playing');
      }
    }).catch(err => {
      console.log('Error al reproducir:', err);
    });
  } else {
    video.pause();
    if (btn) {
      btn.textContent = '🎵';
      btn.classList.remove('playing');
    }
  }
}

// Sincronizar botón con el video
document.addEventListener('DOMContentLoaded', () => {
  createParticles();

  const video = document.getElementById('localVideo');
  const btn = document.getElementById('musicToggle');
  if (video && btn) {
    video.addEventListener('play', () => {
      btn.textContent = '🔊';
      btn.classList.add('playing');
    });
    video.addEventListener('pause', () => {
      btn.textContent = '🎵';
      btn.classList.remove('playing');
    });
  }

  // Hacer que el sobre también responda al clic
  document.getElementById('flowerEnvelope').addEventListener('click', openLetter);
  document.getElementById('envelopeSeal').addEventListener('click', openLetter);
});
