document.addEventListener('DOMContentLoaded', function () {
  // Stat counter animation (your existing code)
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

  // Scroll-based navbar behavior (new addition)
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
