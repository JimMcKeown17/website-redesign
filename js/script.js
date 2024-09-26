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
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 0, // Start with 0 particles
        density: {
          enable: true,
          value_area: 800,
        },
      },
      // shape: {
      //   type: 'image',
      //   image: {
      //     src: 'images/book.svg', // Use a valid book SVG
      //     width: 10,
      //     height: 10,
      //   },
      // },
      size: {
        value: 10, // Size of the book icons
      },
      move: {
        enable: true,
        speed: 3, // Speed of particle movement
        random: true,
        straight: false,
        out_mode: 'bounce',
      },
      line_linked: {
        enable: false,
      },
    },
    interactivity: {
      events: {
        onclick: {
          enable: true,
          mode: 'push', // Add particles on click
        },
      },
      modes: {
        push: {
          particles_nb: 10, // Number of particles to add on each click
        },
      },
    },
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

  var typed = new Typed('#problem-text', {
    strings: [
      'That 81% of children in South Africa cannot read.',
      'Or that South Africa has the highest youth unemployment rate in the world.',
      'We are solving both of those problems.',
    ],
    typeSpeed: 50, // Speed of typing
    backSpeed: 12, // Speed of deleting text
    backDelay: 1000, // Delay before deleting the sentence
    startDelay: 1500, // Delay before starting the typing animation
    loop: true, // Loop the animation
    loopCount: Infinity, // Repeat forever
    showCursor: true, // Show cursor at the end of the typed text
    cursorChar: '|', // Customize the cursor character
  });

  var typed = new Typed('#know', {
    strings: ['Did You Know?'],
    typeSpeed: 60, // Speed of typing
    startDelay: 500, // Start after 500ms delay
    loop: false, // No looping or deleting
    showCursor: false, // No blinking cursor
  });
});
