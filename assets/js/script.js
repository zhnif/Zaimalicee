/*====================================================
    OUR LITTLE UNIVERSE ❤️
    SCRIPT.JS
    PART 1A
====================================================*/

"use strict";

/*====================================================
    ELEMENT
====================================================*/

const loader = document.getElementById("loader");

const typing = document.getElementById("typing");

const menuButton = document.getElementById("menuButton");

const mobileMenu = document.getElementById("mobileMenu");

const cursorGlow = document.getElementById("cursorGlow");

const heartContainer = document.getElementById("heartContainer");

const startJourney = document.getElementById("startJourney");

/*====================================================
    LOADER
====================================================*/

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1700);
});

/*====================================================
    TYPEWRITER
====================================================*/

const messages = [
  "Selamat datang di dunia kecil kita ❤️",
  "Semoga kamu selalu tersenyum hari ini 😊",
  "Aku bersyukur pernah bertemu denganmu 🌸",
  "Website ini dibuat khusus untukmu 💖",
  "❤️ Kamu adalah alasan aku tersenyum.",
  "🌸 Terima kasih sudah hadir.",
  "✨ Dunia terasa lebih indah bersamamu.",
  "💕 Aku akan selalu memilihmu.",
  "💖 Bersamamu adalah rumah.",
];

let messageIndex = 0;

let charIndex = 0;

let deleting = false;

function typeWriter() {
  const current = messages[messageIndex];

  if (!deleting) {
    typing.textContent = current.substring(0, charIndex++);

    if (charIndex > current.length) {
      deleting = true;

      setTimeout(typeWriter, 1800);

      return;
    }
  } else {
    typing.textContent = current.substring(0, charIndex--);

    if (charIndex < 0) {
      deleting = false;

      messageIndex++;

      if (messageIndex >= messages.length) {
        messageIndex = 0;
      }
    }
  }

  setTimeout(typeWriter, deleting ? 30 : 70);
}

typeWriter();

/*====================================================
    MOBILE MENU
====================================================*/

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
});

/*====================================================
    CLOSE MENU
====================================================*/

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});

/*====================================================
    CLICK OUTSIDE
====================================================*/

document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
    mobileMenu.classList.remove("show");
  }
});

/*====================================================
    SCRIPT.JS
    PART 1B
    HEART + CURSOR + REVEAL + SCROLL
====================================================*/

/*====================================================
    START JOURNEY
====================================================*/

startJourney.addEventListener("click", () => {
  const about = document.getElementById("about");

  if (about) {
    about.scrollIntoView({
      behavior: "smooth",

      block: "start",
    });
  }
});

/*====================================================
    FLOATING HEART
====================================================*/

const heartEmoji = ["❤️", "💖", "💕", "💗", "💓"];

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "heart";

  heart.innerHTML = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.fontSize = 18 + Math.random() * 24 + "px";

  heart.style.animationDuration = 5 + Math.random() * 4 + "s";

  heart.style.opacity = 0.4 + Math.random() * 0.6;

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 9000);
}

setInterval(createHeart, 500);

/*====================================================
    CURSOR GLOW
====================================================*/

window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";

  cursorGlow.style.top = e.clientY + "px";
});

/*====================================================
    TOUCH SUPPORT
====================================================*/

window.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];

  cursorGlow.style.left = touch.clientX + "px";

  cursorGlow.style.top = touch.clientY + "px";
});

/*====================================================
    REVEAL ON SCROLL
====================================================*/

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },

  {
    threshold: 0.2,
  },
);

revealItems.forEach((item) => {
  observer.observe(item);
});

/*====================================================
    NAVBAR BLUR
====================================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(20,20,35,.65)";

    navbar.style.backdropFilter = "blur(22px)";
  } else {
    navbar.style.background = "rgba(255,255,255,.08)";
  }
});

/*====================================================
    SCRIPT.JS
    PART 1C
    PREMIUM EFFECTS
====================================================*/

/*==============================
    RIPPLE EFFECT
==============================*/

document.querySelectorAll(".primary,.secondary").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    const rect = this.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = size + "px";
    ripple.style.height = size + "px";

    ripple.style.left = e.clientX - rect.left - size / 2 + "px";

    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    ripple.className = "ripple";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/*==============================
    SPARKLE EFFECT
==============================*/

function sparkle(x, y) {
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("div");

    s.className = "spark";

    s.style.left = x + "px";

    s.style.top = y + "px";

    const angle = Math.random() * 360;

    const distance = Math.random() * 60 + 20;

    s.style.setProperty(
      "--dx",

      Math.cos((angle * Math.PI) / 180) * distance + "px",
    );

    s.style.setProperty(
      "--dy",

      Math.sin((angle * Math.PI) / 180) * distance + "px",
    );

    document.body.appendChild(s);

    setTimeout(() => {
      s.remove();
    }, 1000);
  }
}

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sparkle(
      e.clientX,

      e.clientY,
    );
  });
});

/*==============================
    PARALLAX HERO
==============================*/

window.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");

  const x = (e.clientX / window.innerWidth - 0.5) * 20;

  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  hero.style.transform = `translate(${x}px,${y}px)`;
});

/*==============================
    HERO FLOAT
==============================*/

let heroOffset = 0;

function floatingHero() {
  heroOffset += 0.01;

  const card = document.querySelector(".hero-card");

  card.style.transform = `translateY(${Math.sin(heroOffset) * 8}px)`;

  requestAnimationFrame(floatingHero);
}

floatingHero();

/*==============================
    RANDOM LOVE QUOTES
==============================*/

const quotes = [
  "❤️ Kamu adalah alasan aku tersenyum.",

  "🌸 Terima kasih sudah hadir.",

  "✨ Dunia terasa lebih indah bersamamu.",

  "💕 Aku akan selalu memilihmu.",

  "💖 Bersamamu adalah rumah.",
];

setInterval(() => {
  typing.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}, 12000);

/*==============================
    EASTER EGG
==============================*/

let clickLogo = 0;

document
  .querySelector(".logo")

  .addEventListener("click", () => {
    clickLogo++;

    if (clickLogo === 10) {
      alert(
        "❤️ Kamu menemukan pesan rahasia!\n\nAku sayang kamu lebih dari apa pun.",
      );

      clickLogo = 0;
    }
  });

/*==============================
    RANDOM BACKGROUND SPEED
==============================*/

const aurora = document.querySelector(".aurora");

let speed = 16;

setInterval(() => {
  speed = 12 + Math.random() * 8;

  aurora.style.animationDuration = speed + "s";
}, 8000);

/*====================================================
    SCRIPT.JS
    PART 1D
    MICRO INTERACTION
====================================================*/

/*==============================
    NAVBAR HIDE / SHOW
==============================*/

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.pageYOffset;

  if (current > lastScroll && current > 120) {
    document.querySelector("header").style.transform = "translateY(-120%)";
  } else {
    document.querySelector("header").style.transform = "translateY(0)";
  }

  lastScroll = current;
});

/*==============================
    BUTTON MAGNET
==============================*/

document.querySelectorAll(".primary,.secondary").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;

    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px,${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

/*==============================
    HERO TILT
==============================*/

const heroCard = document.querySelector(".hero-card");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;

  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  heroCard.style.transform = `rotateX(${-y}deg)
         rotateY(${x}deg)`;
});

window.addEventListener("mouseleave", () => {
  heroCard.style.transform = "";
});

/*==============================
    RANDOM FLOAT HEART
==============================*/

setInterval(() => {
  if (Math.random() > 0.55) {
    createHeart();
  }
}, 1800);

/*==============================
    PAGE TITLE
==============================*/

const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "❤️ Aku Disinii..";
  } else {
    document.title = originalTitle;
  }
});

/*==============================
    GREETING
==============================*/

const hour = new Date().getHours();

if (hour < 11) {
  console.log("☀️ Selamat Pagi ❤️");
} else if (hour < 15) {
  console.log("🌸 Selamat Siang ❤️");
} else if (hour < 18) {
  console.log("🌇 Selamat Sore ❤️");
} else {
  console.log("🌙 Selamat Malam ❤️");
}

/*==============================
    LOVE MESSAGE
==============================*/

console.log(`

██████╗  ██████╗ ██╗   ██╗███████╗
██╔══██╗██╔═══██╗██║   ██║██╔════╝
██████╔╝██║   ██║██║   ██║█████╗
██╔══██╗██║   ██║╚██╗ ██╔╝██╔══╝
██║  ██║╚██████╔╝ ╚████╔╝ ███████╗
╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝

Made With ❤️
Only For You

`);

/*====================================================
    SCRIPT.JS
    PART 2C-C
    STARS + SHOOTING STAR + LOVE COUNTER
====================================================*/

/*==============================
        NIGHT STARS
==============================*/

const about = document.querySelector(".about");

function createStar() {
  if (!about) return;

  const star = document.createElement("span");

  star.className = "light-orb";

  const size = Math.random() * 5 + 2;

  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  star.style.background = "white";

  star.style.animationDuration = 8 + Math.random() * 10 + "s";

  about.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 18000);
}

for (let i = 0; i < 35; i++) {
  createStar();
}

setInterval(createStar, 900);

/*==============================
      SHOOTING STAR
==============================*/

function shootingStar() {
  if (!about) return;

  const star = document.createElement("div");

  star.className = "shooting-star";

  star.style.left = Math.random() * 80 + "%";

  star.style.top = Math.random() * 30 + "%";

  star.animate(
    [
      {
        opacity: 0,

        transform: "translate(0,0) rotate(-35deg)",
      },

      {
        opacity: 1,
      },

      {
        opacity: 0,

        transform: "translate(-450px,250px) rotate(-35deg)",
      },
    ],

    {
      duration: 2200,

      easing: "ease-out",
    },
  );

  about.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 2300);
}

setInterval(() => {
  shootingStar();
}, 7000);

/*==============================
      LOVE COUNTER
==============================*/

// GANTI DENGAN TANGGAL JADIAN KALIAN

const anniversary = new Date("2025-01-01T00:00:00");

function updateLoveCounter() {
  const now = new Date();

  const distance = now - anniversary;

  const days = Math.floor(distance / 1000 / 60 / 60 / 24);

  const hours = Math.floor(distance / 1000 / 60 / 60) % 24;

  const minutes = Math.floor(distance / 1000 / 60) % 60;

  const seconds = Math.floor(distance / 1000) % 60;

  document.getElementById("days").textContent = days;

  document.getElementById("hours").textContent = hours;

  document.getElementById("minutes").textContent = minutes;

  document.getElementById("seconds").textContent = seconds;
}

updateLoveCounter();

setInterval(updateLoveCounter, 1000);

/*====================================================
    SCRIPT.JS
    PART 2C-C
    BAGIAN 2
    QUOTE + POLAROID + PARALLAX
====================================================*/

/*==============================
      QUOTE ANIMATION
==============================*/

const quote = document.querySelector(".quote");

if (quote) {
  const text = quote.textContent.trim();

  quote.textContent = "";

  text.split(" ").forEach((word, index) => {
    const span = document.createElement("span");

    span.textContent = word + " ";

    quote.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";

      span.style.transform = "translateY(0)";

      span.style.transition = ".45s ease";
    }, index * 180);
  });
}

/*==============================
      POLAROID REVEAL
==============================*/

const polaroids = document.querySelectorAll(".polaroid");

const photoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            {
              opacity: 0,

              transform: "translateY(120px) rotate(-18deg)",
            },

            {
              opacity: 1,

              transform: "translateY(0) rotate(0deg)",
            },
          ],

          {
            duration: 900,

            fill: "forwards",

            easing: "ease-out",
          },
        );

        photoObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.3,
  },
);

polaroids.forEach((card) => {
  photoObserver.observe(card);
});

/*==============================
      PARALLAX ABOUT
==============================*/

window.addEventListener("scroll", () => {
  const y = window.scrollY;

  if (about) {
    about.style.backgroundPositionY = y * 0.25 + "px";
  }
});

/*==============================
      PHOTO SPARKLE
==============================*/

function createSparkle(target) {
  const rect = target.getBoundingClientRect();

  const spark = document.createElement("div");

  spark.className = "sparkle";

  spark.style.left = rect.left + Math.random() * rect.width + "px";

  spark.style.top = rect.top + Math.random() * rect.height + "px";

  document.body.appendChild(spark);

  setTimeout(() => {
    spark.remove();
  }, 1000);
}

polaroids.forEach((photo) => {
  setInterval(
    () => {
      createSparkle(photo);
    },
    1200 + Math.random() * 1000,
  );
});

/*==============================
      HOVER TILT
==============================*/

polaroids.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 12;

    const rotateX = (y / rect.height - 0.5) * -12;

    card.style.transform = `perspective(900px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/*==============================
      COUNTER POP
==============================*/

document

  .querySelectorAll(".counter span")

  .forEach((item) => {
    item.animate(
      [
        {
          transform: "scale(.8)",
        },

        {
          transform: "scale(1.1)",
        },

        {
          transform: "scale(1)",
        },
      ],

      {
        duration: 700,
      },
    );
  });

/*====================================================
    PART 3B-B
    MUSIC PLAYER PREMIUM
====================================================*/

const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const albumCover = document.getElementById("albumCover");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const visualizer = document.querySelector(".visualizer");

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minute = Math.floor(time / 60);

  const second = Math.floor(time % 60);

  return `${minute}:${String(second).padStart(2, "0")}`;
}

music.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(music.duration);

  progress.max = Math.floor(music.duration);
});

playBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();

    playBtn.innerHTML = "⏸";

    albumCover.classList.add("playing");

    visualizer.classList.add("active");
  } else {
    music.pause();

    playBtn.innerHTML = "▶";

    albumCover.classList.remove("playing");

    visualizer.classList.remove("active");
  }
});

music.addEventListener("timeupdate", () => {
  progress.value = Math.floor(music.currentTime);

  currentTime.textContent = formatTime(music.currentTime);
});

progress.addEventListener("input", () => {
  music.currentTime = progress.value;
});

volume.addEventListener("input", () => {
  music.volume = volume.value;
});

music.addEventListener("ended", () => {
  playBtn.innerHTML = "▶";

  albumCover.classList.remove("playing");

  visualizer.classList.remove("active");

  progress.value = 0;
});

/*==================================
      CINEMATIC ENDING
==================================*/

const endingScene = document.getElementById("endingScene");

const foreverBtn = document.getElementById("foreverBtn");

const loveButton = document.getElementById("loveButton");

if (loveButton) {
  loveButton.onclick = () => {
    endingScene.classList.add("show");

    if (music) {
      music.volume = 0.25;
    }
  };
}

if (foreverBtn) {
  foreverBtn.onclick = () => {
    createHeartExplosion();

    launchConfetti();

    launchFireworks();
  };
}
// =====================
// GALLERY REVEAL
// =====================

const galleryCards = document.querySelectorAll(".memory-card");

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

reveals.forEach((item) => {
  revealObserver.observe(item);
});

// =====================
// IMAGE MODAL
// =====================

const modal = document.querySelector(".image-modal");

const modalImg = document.querySelector(".modal-image");

const closeModal = document.querySelector(".close-modal");

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    let img = card.querySelector("img");

    modalImg.src = img.src;

    modal.classList.add("active");
  });
});

closeModal.onclick = () => {
  modal.classList.remove("active");
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
};

// =================================
// PREMIUM 3D CARD TILT
// =================================

const cards = document.querySelectorAll(".premium-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;

    const rotateY = (x - centerX) / 15;

    card.style.transform = `
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

/* ==========================================================
   FINAL SURPRISE
   PART 10.3
========================================================== */

const finalBtn = document.getElementById("finalBtn");
const finalModal = document.getElementById("finalModal");
const closeFinal = document.getElementById("closeFinal");
const starsContainer = document.querySelector(".ending-stars");

let finalOpened = false;

/*==========================
OPEN MODAL
==========================*/

finalBtn.addEventListener("click", () => {
  if (finalOpened) return;

  finalOpened = true;

  finalModal.classList.add("show");

  document.body.style.overflow = "hidden";

  createHearts(80);

  createConfetti(120);
});

/*==========================
CLOSE MODAL
==========================*/

function closeEnding() {
  finalModal.classList.remove("show");

  document.body.style.overflow = "";
}

closeFinal.addEventListener("click", closeEnding);

/*==========================
ESC
==========================*/

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeEnding();
  }
});

/*==========================
STARS
==========================*/

for (let i = 0; i < 120; i++) {
  const star = document.createElement("span");

  star.className = "star";

  star.style.left = Math.random() * 100 + "%";

  star.style.top = Math.random() * 100 + "%";

  star.style.animationDelay = Math.random() * 4 + "s";

  star.style.animationDuration = 2 + Math.random() * 4 + "s";

  starsContainer.appendChild(star);
}

/*==========================
HEARTS
==========================*/

function createHearts(total) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");

      heart.className = "floating-heart";

      heart.innerHTML = "❤️";

      heart.style.left = Math.random() * 100 + "vw";

      heart.style.bottom = "-30px";

      heart.style.fontSize = 16 + Math.random() * 28 + "px";

      heart.style.animationDuration = 4 + Math.random() * 3 + "s";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 7000);
    }, i * 45);
  }
}

/*==========================
CONFETTI
==========================*/

const colors = ["#ff2d55", "#ff5c8a", "#ffffff", "#ffd166", "#ff8fab"];

function createConfetti(total) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const confetti = document.createElement("span");

      confetti.className = "confetti";

      confetti.style.left = Math.random() * 100 + "vw";

      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      confetti.style.animationDuration = 3 + Math.random() * 3 + "s";

      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 7000);
    }, i * 20);
  }
}

/*==========================
CLICK OUTSIDE
==========================*/

finalModal.addEventListener("click", (e) => {
  if (e.target === finalModal) {
    closeEnding();
  }
});
