/**
 * =========================================================================
 * KONFIGURASI WEB ULTAH (BISA KAMU UBAH DENGAN MUDAH DI SINI)
 * =========================================================================
 */
const CONFIG = {
  // Nama orang yang berulang tahun
  receiverName: "Shenaa",

  // Nama kamu sebagai pengirim
  senderName: "Orang yang Selalu Menyayangimu ❤️",

  // Nomor WhatsApp tujuan untuk tombol balasan (Gunakan format 62, contoh: "628123456789")
  whatsappNumber: "62895328181182",

  // Pesan default balasan saat tombol WhatsApp diklik
  whatsappMessage: "Makasih banyak ya sayang buat ucapan dan website ulang tahunnya! Aku terharu banget... Sayang kamu banyak-banyak! ❤️🥰",

  // Isi surat panjang (akan diketik otomatis huruf demi huruf)
  letterText: `Selamat ulang tahun yang paling indah untuk sosok yang paling spesial di hidupku! 🌸

Hari ini adalah hari yang begitu istimewa, hari di mana seseorang yang sangat baik hati, manis, dan berharga dihadirkan ke dunia ini, aku seneng kenal kamu semoga kamu selalu menyannggi aku dan selalu bersama aku selamanya. Terima kasih banyak yaa sudah selalu menjadi penyemangat, mewarnai setiap hari-hariku dengan tawamu, dan selalu ada di sisiku dalam suka maupun duka.

Di usiamu yang baru ini, segenap doaku selalu menyertaimu:
🌸 Semoga kamu selalu dilimpahkan kesehatan, ketenangan jiwa, dan kebahagiaan tanpa akhir.
🌸 Semoga apa pun impian, cita-cita, dan rencanamu selalu dimudahkan jalannya oleh Tuhan.
🌸 Semoga kamu selalu dikelilingi oleh orang-orang baik yang tulus menyayangimu.

Jangan pernah ragu akan dirimu sendiri. Kamu itu hebat, kamu berharga, dan kamu pantas mendapatkan semua kebaikan yang ada di dunia ini.

Once again, happy birthday, my favorite human! I'm so lucky to have you. ❤️`,

  // Daftar doa & harapan acak untuk Make A Wish Generator
  randomWishes: [
    "Semoga di umur yang baru ini, setiap langkahmu selalu dipenuhi kemudahan dan keberuntungan! ",
    "Semoga selalu sehat, bahagia hatinya, dan dijauhkan dari segala hal yang membuatmu sedih. ",
    "Semoga semua impian besar yang kamu simpan diam-diam segera terkabul satu per satu! ",
    "Semoga rezekimu selalu mengalir lancar dan berkah setiap harinya. ",
    "Semoga senyuman manismu tidak pernah pudar, apa pun rintangan yang sedang kamu hadapi. ",
    "Semoga kita bisa terus merayakan hari ulang tahun ini bersama-sama hingga tahun-tahun berikutnya! ",
    "Semoga kamu selalu dikelilingi orang-orang yang tulus dan menghargai ketulusan hatimu. ",
    "Semoga semesta selalu berbaik hati menjaga dan melindungimu di mana pun kamu berada. "
  ]
};

/* =========================================================================
   GLOBAL STATE & VARIABLES
   ========================================================================= */
let isMusicPlaying = false;
let audioContext = null;
let currentSlideIndex = 0;
let typewriterTimeout = null;
let typewriterIndex = 0;
let typewriterSpeed = 35; // Kecepatan normal (ms per huruf)
let isTypewriterFinished = false;
let candleExtinguished = false;

/* =========================================================================
   INITIALIZATION UPON DOM READY
   ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Terapkan data nama ke elemen-elemen HTML
  applyConfigData();

  // 2. Generate partikel background bintang/cahaya melayang
  generateFloatingParticles();

  // 3. Layar Pembuka (Landing Overlay) & Musik Autoplay Handler
  setupLandingOverlay();

  // 4. Floating Music Player Widget
  setupFloatingMusic();

  // 5. Spotify Wrapped Carousel (Slide & Swipe)
  setupWrappedCarousel();

  // 6. Amplop 3D & Efek Mengetik Surat (Typewriter)
  setupEnvelopeAndTypewriter();

  // 7. Virtual Cake & Tiup Lilin
  setupCakeAndCandle();

  // 8. Galeri Kenangan & Lightbox Pop-up
  setupGalleryLightbox();

  // 9. Kotak Harapan (Random Wish Generator)
  setupWishGenerator();

  // 10. Tombol Balasan WhatsApp
  setupWhatsAppButton();
});

/* =========================================================================
   1. TERAPKAN CONFIG DATA
   ========================================================================= */
function applyConfigData() {
  const displayReceiver = document.getElementById("displayReceiverName");
  const letterReceiver = document.getElementById("letterReceiverName");
  const letterSender = document.getElementById("letterSenderName");
  const letterDate = document.getElementById("letterCurrentDate");

  if (displayReceiver) displayReceiver.textContent = CONFIG.receiverName;
  if (letterReceiver) letterReceiver.textContent = CONFIG.receiverName;
  if (letterSender) letterSender.textContent = CONFIG.senderName;

  // Tanggal surat dikunci secara manual menjadi 29 November 2026
  if (letterDate) {
    letterDate.textContent = "29 November 2026";
  }
}

/* =========================================================================
   2. GENERATOR PARTIKEL BACKGROUND (BINTANG & CAHAYA)
   ========================================================================= */
function generateFloatingParticles() {
  const container = document.getElementById("particlesContainer");
  if (!container) return;

  const icons = ["✨", "🌸", "💖", "⭐", "🤍", "🌷", "🍓", "🎈"];
  const count = 24;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = icons[Math.floor(Math.random() * icons.length)];
    p.style.left = Math.random() * 95 + "vw";
    p.style.animationDuration = (6 + Math.random() * 8) + "s";
    p.style.animationDelay = (Math.random() * 6) + "s";
    p.style.fontSize = (14 + Math.random() * 16) + "px";
    container.appendChild(p);
  }
}

/* =========================================================================
   3. WEB AUDIO API SYNTHESIZER & AUDIO HANDLER
   ========================================================================= */
function getAudioContext() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume();
  }
  return audioContext;
}

// SFX: Suara Klik (Crisp Pop)
function playClickSFX() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) { console.log(e); }
}

// SFX: Suara Tiupan Lilin (Whoosh / Wind)
function playBlowSFX() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) { console.log(e); }
}

// SFX: Fanfare / Cheering
function playCheerSFX() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + idx * 0.08;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.6);
    });
  } catch (e) { console.log(e); }
}

/* =========================================================================
   4. LAYAR PEMBUKA (LANDING OVERLAY) & AUTOPLAY MUSIK
   ========================================================================= */
function setupLandingOverlay() {
  const overlay = document.getElementById("landingOverlay");
  const btnOpen = document.getElementById("btnOpenExperience");

  if (!btnOpen || !overlay) return;

  btnOpen.addEventListener("click", () => {
    // 1. Efek suara klik
    playClickSFX();

    // 2. Aktifkan AudioContext browser
    getAudioContext();

    // 3. PUTAR MUSIK SECARA OTOMATIS SAAT TOMBOL DIKLIK
    startMusic();

    // 4. Hilangkan overlay pembuka dengan mulus
    overlay.classList.add("fade-out");
    setTimeout(() => {
      overlay.style.display = "none";
    }, 500);

    // 5. Munculkan efek kembang api / confetti pembuka
    fireConfettiBurst();
  });
}

function startMusic() {
  const audio = document.getElementById("bgAudio");
  const widget = document.getElementById("musicWidget");
  const tag = document.getElementById("musicTag");

  if (audio) {
    audio.play().then(() => {
      isMusicPlaying = true;
      if (widget) widget.classList.add("playing");
      if (tag) tag.textContent = "Musik Aktif";
    }).catch((err) => {
      console.log("Autoplay audio gagal atau file music.mp3 belum ada:", err);
      isMusicPlaying = false;
      if (tag) tag.textContent = "Putar Musik";
    });
  }
}

function pauseMusic() {
  const audio = document.getElementById("bgAudio");
  const widget = document.getElementById("musicWidget");
  const tag = document.getElementById("musicTag");

  if (audio) audio.pause();

  isMusicPlaying = false;
  if (widget) widget.classList.remove("playing");
  if (tag) tag.textContent = "Putar Musik";
}

function setupFloatingMusic() {
  const widget = document.getElementById("musicWidget");
  if (!widget) return;

  widget.addEventListener("click", () => {
    playClickSFX();
    if (isMusicPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  });
}

/* =========================================================================
   5. SPOTIFY WRAPPED CAROUSEL (SLIDE, SWIPE, & PROGRESS BARS)
   ========================================================================= */
function setupWrappedCarousel() {
  const slides = document.querySelectorAll(".wrapped-card");
  const pBars = document.querySelectorAll(".p-bar");
  const cDots = document.querySelectorAll(".c-dot");
  const btnPrev = document.getElementById("btnPrevSlide");
  const btnNext = document.getElementById("btnNextSlide");
  const container = document.getElementById("wrappedContainer");

  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlideIndex = index;

    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === currentSlideIndex);
    });

    pBars.forEach((p, idx) => {
      p.classList.toggle("active", idx <= currentSlideIndex);
    });

    cDots.forEach((d, idx) => {
      d.classList.toggle("active", idx === currentSlideIndex);
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      playClickSFX();
      goToSlide(currentSlideIndex + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      playClickSFX();
      goToSlide(currentSlideIndex - 1);
    });
  }

  cDots.forEach(dot => {
    dot.addEventListener("click", () => {
      playClickSFX();
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      goToSlide(idx);
    });
  });

  // Touch Swipe Support (Mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  if (container) {
    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      playClickSFX();
      goToSlide(currentSlideIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      playClickSFX();
      goToSlide(currentSlideIndex - 1);
    }
  }
}

/* =========================================================================
   6. SURAT UCAPAN INTERAKTIF (3D ENVELOPE + TYPEWRITER EFFECT)
   ========================================================================= */
function setupEnvelopeAndTypewriter() {
  const envelope = document.getElementById("envelopeElement");
  const seal = document.getElementById("envelopeSeal");
  const typewriterEl = document.getElementById("typewriterParagraph");
  const controls = document.getElementById("typewriterControls");
  const btnSpeedUp = document.getElementById("btnSpeedUp");
  const btnSkip = document.getElementById("btnSkipTyping");
  const btnReplay = document.getElementById("btnReplayTyping");

  let isEnvelopeOpen = false;

  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    playClickSFX();
    envelope.classList.add("opened");

    if (controls) controls.classList.remove("hidden");

    fireConfettiBurst();
    startTypewriter();
  }

  if (envelope) envelope.addEventListener("click", openEnvelope);
  if (seal) seal.addEventListener("click", (e) => {
    e.stopPropagation();
    openEnvelope();
  });

  function startTypewriter() {
    if (!typewriterEl) return;
    clearTimeout(typewriterTimeout);
    typewriterEl.textContent = "";
    typewriterEl.classList.add("typing");
    typewriterIndex = 0;
    isTypewriterFinished = false;

    typeChar();
  }

  function typeChar() {
    const fullText = CONFIG.letterText;
    if (typewriterIndex < fullText.length) {
      typewriterEl.textContent += fullText.charAt(typewriterIndex);
      typewriterIndex++;
      typewriterTimeout = setTimeout(typeChar, typewriterSpeed);
    } else {
      finishTypewriter();
    }
  }

  function finishTypewriter() {
    clearTimeout(typewriterTimeout);
    typewriterEl.textContent = CONFIG.letterText;
    typewriterEl.classList.remove("typing");
    isTypewriterFinished = true;

    playCheerSFX();
    fireConfettiBurst();
  }

  if (btnSpeedUp) {
    btnSpeedUp.addEventListener("click", () => {
      playClickSFX();
      typewriterSpeed = 10;
      btnSpeedUp.style.background = "var(--neon-pink)";
    });
  }

  if (btnSkip) {
    btnSkip.addEventListener("click", () => {
      playClickSFX();
      finishTypewriter();
    });
  }

  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      playClickSFX();
      typewriterSpeed = 35;
      if (btnSpeedUp) btnSpeedUp.style.background = "";
      startTypewriter();
    });
  }
}

/* =========================================================================
   7. VIRTUAL CAKE & TIUP LILIN INTERAKTIF
   ========================================================================= */
function setupCakeAndCandle() {
  const cake = document.getElementById("virtualCake");
  const btnBlow = document.getElementById("btnBlowCandle");
  const flame = document.getElementById("candleFlame");
  const glow = document.getElementById("candleGlow");
  const smoke = document.getElementById("candleSmoke");
  const status = document.getElementById("cakeStatusText");

  function blowCandle() {
    if (candleExtinguished) return;
    candleExtinguished = true;

    playBlowSFX();

    flame.classList.add("blown");
    glow.classList.add("blown");
    smoke.classList.remove("hidden");

    if (status) {
      status.innerHTML = " Yayy Lilin berhasil ditiup! Semoga semua doa dan harapanmu terkabul ya kesayangan aku! 💖";
      status.style.color = "var(--soft-pink)";
    }

    if (btnBlow) {
      btnBlow.innerHTML = '<i class="fa-solid fa-check"></i> <span>Lilin Berhasil Ditiup! </span>';
      btnBlow.disabled = true;
      btnBlow.style.opacity = "0.75";
      btnBlow.style.cursor = "default";
    }

    setTimeout(() => {
      playCheerSFX();
      fireGrandCelebration();
    }, 300);
  }

  if (cake) cake.addEventListener("click", blowCandle);
  if (btnBlow) btnBlow.addEventListener("click", blowCandle);
}

/* =========================================================================
   8. GALERI KENANGAN & LIGHTBOX POP-UP
   ========================================================================= */
function setupGalleryLightbox() {
  const cards = document.querySelectorAll(".gallery-card");
  const modal = document.getElementById("lightboxModal");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("lightboxClose");
  const imgEl = document.getElementById("lightboxImg");
  const captionEl = document.getElementById("lightboxCaption");

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      playClickSFX();
      const imgSrc = card.getAttribute("data-img");
      const captionText = card.getAttribute("data-caption");

      if (imgEl) imgEl.src = imgSrc;
      if (captionEl) captionEl.textContent = captionText;

      modal.classList.add("open");
    });
  });

  function closeModal() {
    modal.classList.remove("open");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/* =========================================================================
   9. KOTAK HARAPAN & DOA (RANDOM WISH GENERATOR)
   ========================================================================= */
function setupWishGenerator() {
  const btn = document.getElementById("btnRandomWish");
  const quoteText = document.getElementById("wishQuoteText");
  const box = document.getElementById("wishDisplayBox");

  let lastIndex = -1;

  if (!btn || !quoteText) return;

  btn.addEventListener("click", () => {
    playClickSFX();

    box.style.transform = "scale(0.96)";
    quoteText.style.opacity = "0";

    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * CONFIG.randomWishes.length);
      } while (nextIndex === lastIndex && CONFIG.randomWishes.length > 1);

      lastIndex = nextIndex;
      quoteText.textContent = `"${CONFIG.randomWishes[nextIndex]}"`;

      box.style.transform = "scale(1)";
      quoteText.style.opacity = "1";

      fireMiniConfetti();
    }, 200);
  });
}

/* =========================================================================
   10. TOMBOL BALASAN WHATSAPP
   ========================================================================= */
function setupWhatsAppButton() {
  const btnWA = document.getElementById("btnWhatsApp");
  if (!btnWA) return;

  const phone = CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(CONFIG.whatsappMessage);
  btnWA.href = `https://wa.me/${phone}?text=${encodedMsg}`;

  btnWA.addEventListener("click", () => {
    playClickSFX();
  });
}

/* =========================================================================
   CONFETTI EFFECTS (CANVAS-CONFETTI)
   ========================================================================= */
function fireMiniConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff3377', '#ff75a0', '#f472b6', '#ffd166', '#ffffff']
    });
  }
}

function fireConfettiBurst() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 85,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3377', '#ff75a0', '#f472b6', '#ffd166', '#ffffff']
    });
  }
}

function fireGrandCelebration() {
  if (typeof confetti === "function") {
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff3377', '#ff75a0', '#f472b6', '#ffd166', '#ffffff', '#5c0f46'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}