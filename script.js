// script.js

document.addEventListener('DOMContentLoaded', function () {
  const bg2Mobil = document.getElementById('bg2-mobil');
  const bg2Desktop = document.getElementById('bg2-desktop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const fadeDistance = window.innerHeight * 0.7;
    const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
    const opacityFixed = opacity.toFixed(2);

    if (bg2Mobil && window.innerWidth < 768) {
      bg2Mobil.style.opacity = opacityFixed;
    }
    if (bg2Desktop && window.innerWidth >= 768) {
      bg2Desktop.style.opacity = opacityFixed;
    }
  });

  // Konfetti (funktioniert weiterhin global)
  window.throwConfetti = function(e) {
    const rect = e.target.getBoundingClientRect();
    confetti({
      particleCount: 100,
      spread: 60,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      }
    });
  };
});
