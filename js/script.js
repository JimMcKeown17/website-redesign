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
  const navLinks = document.querySelectorAll('.nav-link'); // Select all nav links

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navLinks.forEach((link) => link.classList.remove('nav-link-white'));
    } else {
      navbar.classList.remove('scrolled');
      navLinks.forEach((link) => link.classList.add('nav-link-white'));
    }
  });

  // Original Working Particles.js initialization
  // particlesJS('particles-js', {
  //   particles: {
  //     number: {
  //       value: 80,
  //     },
  //     shape: {
  //       type: 'circle', // You can change this to "image" for custom shapes
  //     },
  //     size: {
  //       value: 3,
  //     },
  //     line_linked: {
  //       enable: true,
  //     },
  //     move: {
  //       speed: 2,
  //     },
  //   },
  // });

  // Initialize particles.js with 0 particles to start
  // particlesJS('particles-js', {
  //   particles: {
  //     number: {
  //       value: 0, // Start with 0 particles
  //       density: {
  //         enable: true,
  //         value_area: 800,
  //       },
  //     },
  // shape: {
  //   type: 'image',
  //   image: {
  //     src: 'images/book.svg', // Use a valid book SVG
  //     width: 10,
  //     height: 10,
  //   },
  // },
  //   size: {
  //     value: 10, // Size of the book icons
  //   },
  //   move: {
  //     enable: true,
  //     speed: 3, // Speed of particle movement
  //     random: true,
  //     straight: false,
  //     out_mode: 'bounce',
  //   },
  //   line_linked: {
  //     enable: false,
  //   },
  // },
  // interactivity: {
  //     events: {
  //       onclick: {
  //         enable: true,
  //         mode: 'push', // Add particles on click
  //       },
  //     },
  //     modes: {
  //       push: {
  //         particles_nb: 10, // Number of particles to add on each click
  //       },
  //     },
  //   },
  // });

  // window.addEventListener('load', initSwiper);

  // Floating Stats Data Drive Section
  const stats = document.querySelectorAll('#floating-stats .stat');
  const sectionHeight = document.getElementById('floating-stats').offsetHeight;

  stats.forEach((stat) => {
    // Random horizontal position
    const randomLeft = Math.random() * 90; // Prevent overflow
    stat.style.left = randomLeft + '%';

    // Random font size
    const randomFontSize = Math.random() * 10 + 14;
    stat.style.fontSize = randomFontSize + 'px';

    // Animate upward with fade in and fade out
    gsap.fromTo(
      stat,
      { y: sectionHeight, opacity: 0 },
      {
        y: -200, // Increase the negative value to make them move out of view completely
        opacity: 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
        repeat: -1,
        ease: 'linear',
        onUpdate: function () {
          // Calculate fading out opacity as it moves towards the top
          const progress = this.progress(); // Gets a value between 0 and 1
          stat.style.opacity = Math.max(0, 1 - progress);
        },
        onRepeat: function () {
          // Randomize position and duration on each repeat
          stat.style.left = Math.random() * 90 + '%';
          stat.style.fontSize = Math.random() * 10 + 14 + 'px';
          this.duration(Math.random() * 10 + 10);
        },
      }
    );
  });

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

  if (document.querySelector('#typed-test')) {
    new Typed('#typed-test', {
      strings: [
        'Hello, this is a test to check if Typed.js is working.',
        'It should type and delete these messages.',
        'If you see this, Typed.js is functional!',
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  // Ensure the elements are present before trying to use Typed.js
  if (
    document.querySelector('#problem-text') &&
    document.querySelector('#know')
  ) {
    // Initialize typed.js for the problem text
    new Typed('#problem-text', {
      strings: [
        'That 81% of children in South Africa cannot read.',
        'Or that South Africa has the highest youth unemployment rate in the world.',
        'We are solving both of those problems.',
      ],
      typeSpeed: 50,
      backSpeed: 12,
      backDelay: 1000,
      startDelay: 1500,
      loop: true,
      loopCount: Infinity,
      showCursor: true,
      cursorChar: '|',
    });

    // Initialize typed.js for the "Did You Know?" text
    new Typed('#know', {
      strings: ['Did You Know?'],
      typeSpeed: 60,
      startDelay: 500,
      loop: false,
      showCursor: false,
    });
  } else {
    console.error('Element(s) for Typed.js not found');
  }

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
