document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ JS Loaded");

  // Sticky navbar effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Back to Top button
  const backToTopBtn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    backToTopBtn?.classList.toggle('active', window.scrollY > 300);
  });
  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll reveal animation
  const observerOptions = { threshold: 0.1 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    'section, .about-animate,.skill-item, .education-card, .experience-card, .project-card, .achievement-card, .badge-card, .section-title h2'
  );
  animatedElements.forEach(el => revealObserver.observe(el));

  // Typing effect
  const typingTarget = document.getElementById("typing-text");
  const phrases = [
    "BCA Student",
    "Aspiring Full Stack Developer",
    "Passionate About Scalable Code"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const currentText = currentPhrase.substring(0, charIndex);
    if (typingTarget) typingTarget.textContent = currentText;

    if (!isDeleting && charIndex < currentPhrase.length) {
      charIndex++;
      setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 1000);
    }
  }

  if (typingTarget) type();

  // Toggle project descriptions
  document.querySelectorAll('.toggle-desc').forEach(button => {
    button.addEventListener('click', () => {
      const descId = button.getAttribute('data-target');
      const desc = document.getElementById(descId);
      if (!desc) return;

      const isHidden = desc.style.display === 'none' || desc.style.display === '';
      desc.style.display = isHidden ? 'block' : 'none';
      button.textContent = isHidden ? 'Hide' : 'About';
    });
  });

  // Contact form functionality
  const contactForm = document.getElementById("contactForm");
  const submitButton = contactForm?.querySelector('button[type="submit"]');

  if (contactForm && submitButton) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        alert('⚠️ Please fill in all fields.');
        return;
      }

      submitButton.disabled = true;
      submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

      try {
        const response = await fetch('https://backend-1-w12z.onrender.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();
        

        if (!response.ok) throw new Error(result.error || "Something went wrong");

        alert(result.message || '✅ Message sent successfully!');
        contactForm.reset();
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        alert(error.message || '❌ Failed to send message.');
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
      }
    });
  } else {
    console.warn("⚠️ Contact form or submit button not found!");
  }
});


 const faders = document.querySelectorAll('.fade-in-up');
  const appearOptions = { threshold: 0.2 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

 const aboutFaders = document.querySelectorAll('.fade-in-up');
  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  aboutFaders.forEach(fader => {
    aboutObserver.observe(fader);
  });



