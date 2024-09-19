document.addEventListener('DOMContentLoaded', function () {
  // Stat counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  const animateCounter = (counter) => {
    const target = counter.getAttribute('data-target');
    const isPercentage = target.includes('%');
    const isX = target.includes('X');
    let count = 0;

    const updateCount = () => {
      const targetNum = parseInt(target.replace('%', '').replace('X', ''));
      const increment = targetNum / speed;

      if (count < targetNum) {
        count += increment;
        if (isPercentage) {
          counter.innerText = Math.ceil(count) + '%';
        } else if (isX) {
          counter.innerText = Math.ceil(count) + 'X';
        } else {
          counter.innerText = Math.ceil(count);
        }
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // Scroll-based navbar behavior
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll-based stats opacity update
  const section = document.querySelector('.impact-stats-section');
  const stats = document.querySelectorAll('.stat');
  const sectionHeight = section.offsetHeight;

  function updateStats() {
    const scrollPosition = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionScrolled = scrollPosition - sectionTop;

    if (sectionScrolled >= 0 && sectionScrolled <= sectionHeight) {
      const progress = sectionScrolled / sectionHeight;

      stats.forEach((stat, index) => {
        const startPoint = index / stats.length;
        const endPoint = (index + 1) / stats.length;

        if (progress >= startPoint && progress < endPoint) {
          stat.style.opacity = 1;
        } else {
          stat.style.opacity = 0; // Hide stats not in view
        }
      });
    } else {
      // Hide all stats when outside the section
      stats.forEach((stat) => {
        stat.style.opacity = 0;
      });
    }
  }

  window.addEventListener('scroll', updateStats);
  updateStats(); // Initial call to set correct state on page load
});
