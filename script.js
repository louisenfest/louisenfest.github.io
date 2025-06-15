// script.js

// Fallback
const ENABLE_FALLBACK = false;

(function redirectToFallback() {
  if (ENABLE_FALLBACK) {
    const currentPath = window.location.pathname;
    const alreadyOnFallback = currentPath.endsWith('fallback.html') || currentPath.includes('fallback');

    if (!alreadyOnFallback) {
      window.location.href = 'file:///C:/Users/49176/Downloads/Jeremias%20Website/Louisenfest/t/fallback.html';
    }
  }
})();


// bg
document.addEventListener('DOMContentLoaded', function () {
  const bg2Mobil = document.getElementById('bg2-mobil');
  const bg2MobilReg = document.getElementById('bg2-mobil-reg');
  const bg2Desktop = document.getElementById('bg2-desktop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const screenWidth = window.innerWidth;

    // Mobilbereich
    if (screenWidth < 768) {

      if (bg2Mobil) {
        const fadeDistance = window.innerHeight * 0.7;
        const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
        bg2Mobil.style.opacity = opacity.toFixed(2);
      }

      if (bg2MobilReg) {
        const fadeDistance = window.innerHeight * 0.3;
        const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
        bg2MobilReg.style.opacity = opacity.toFixed(2);
      }
    }

    // Desktopbereich
    if (screenWidth >= 768 && bg2Desktop) {
      const fadeDistance = window.innerHeight * 0.7;
      const opacity = Math.max(1 - scrollTop / fadeDistance, 0);
      bg2Desktop.style.opacity = opacity.toFixed(2);
    }
  });
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

// Toggle
document.addEventListener('DOMContentLoaded', () => {
  const triggers = document.querySelectorAll('.toggleTrigger');

  // Nur die data-target-basierten sollen sich gegenseitig ausschließen
  const closeAllTargets = () => {
    document.querySelectorAll('.toggleContent[data-exclusive="true"]').forEach(el => {
      el.style.display = 'none';
      el.dataset.expanded = 'false';
    });
  };

  triggers.forEach(trigger => {
    const png = trigger.querySelector('.toggle-png');
    const targetSelector = trigger.getAttribute('data-target');
    const defaultOpen = trigger.getAttribute('data-default-open') === 'true';
    const displayType = trigger.getAttribute('data-display') || 'block';

    // Ziel-Element ermitteln
    const target = targetSelector
      ? document.querySelector(targetSelector)
      : trigger.nextElementSibling;

    if (!target) return;

    // Anfangszustand
    target.style.display = defaultOpen ? displayType : 'none';
    target.dataset.expanded = defaultOpen.toString();

    if (targetSelector) {
      target.classList.add('toggleContent'); // sicherstellen, dass auch diese Klasse vorhanden ist
      target.setAttribute('data-exclusive', 'true');
    }

    // Toggle-Event
    trigger.addEventListener('click', () => {
      const isExpanded = target.dataset.expanded === 'true';

      if (targetSelector) {
        // nur für data-target (Maps): alle schließen
        if (!isExpanded) closeAllTargets();
      }

      target.style.display = isExpanded ? 'none' : displayType;
      target.dataset.expanded = (!isExpanded).toString();

      if (png) {
        png.src = isExpanded ? '../b/toggle-up.png' : '../b/toggle-down.png';
      }
    });
  });
});

