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

  // -- About Us Image Track (New Code) --

  const track = document.getElementById('image-track');

  // Function to handle mouse down event
  const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

  // Function to handle mouse up event
  const handleOnUp = () => {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  // Function to handle mouse move event
  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    // Animate the track to move left and right
    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: 'forwards' }
    );

    // Animate each image within the track
    for (const image of track.getElementsByClassName('image')) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: 'forwards' }
      );
    }
  };

  /* -- Additional handling for touch events -- */

  // Handle mouse down event for desktop
  window.onmousedown = (e) => handleOnDown(e);

  // Handle touch start event for mobile
  window.ontouchstart = (e) => handleOnDown(e.touches[0]);

  // Handle mouse up event for desktop
  window.onmouseup = (e) => handleOnUp(e);

  // Handle touch end event for mobile
  window.ontouchend = (e) => handleOnUp(e.touches[0]);

  // Handle mouse move event for desktop
  window.onmousemove = (e) => handleOnMove(e);

  // Handle touch move event for mobile
  window.ontouchmove = (e) => handleOnMove(e.touches[0]);

  // -- End of About Us Image Track --
});
