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

  triggers.forEach(trigger => {
    const menu = trigger.nextElementSibling;
    const png = trigger.querySelector('.toggle-png');

    const getDefaultOpen = () => {
      const attr = trigger.getAttribute('data-default-open');
      return attr === 'true';
    };

    const getDisplayType = () => {
      return trigger.getAttribute('data-display') || 'block';
    };

    const setInitialState = () => {
      const defaultOpen = getDefaultOpen();
      const displayType = getDisplayType();
      menu.style.display = defaultOpen ? displayType : 'none';
      menu.dataset.expanded = defaultOpen.toString();
    };

    trigger.addEventListener('click', () => {
      const isExpanded = menu.dataset.expanded === 'true';
      const displayType = getDisplayType();
      menu.style.display = isExpanded ? 'none' : displayType;
      menu.dataset.expanded = (!isExpanded).toString();

      if (png) {
        png.src = !isExpanded ? '../b/toggle-down.png' : '../b/toggle-up.png';
      }
    });

    setInitialState();
  });
});
