// Typing Animation with better configuration
const typingElements = document.querySelectorAll(".typing, .typing-2");
typingElements.forEach((element) => {
  new Typed(element, {
    strings: ["Developer", "Teacher", "IT Student", "Psychology Student"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    smartBackspace: true,
    showCursor: true,
    cursorChar: "|",
  });
});

// Sticky Navigation Menu with throttle for performance
let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const navbarHeight = navbar.offsetHeight;

window.addEventListener(
  "scroll",
  function () {
    const currentScroll = window.scrollY;

    // Toggle sticky class based on scroll position
    navbar.classList.toggle("sticky", currentScroll > 20);

    // Optional: Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > navbarHeight) {
      navbar.classList.add("nav-hide");
    } else {
      navbar.classList.remove("nav-hide");
    }
    lastScroll = currentScroll;
  },
  { passive: true }
);

// Toggle Menu/Navbar with animation
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu li a");

let menuOpen = false;

const toggleMenu = () => {
  menu.classList.toggle("active");
  menuBtn.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  menuOpen = !menuOpen;
};

menuBtn.addEventListener("click", toggleMenu);

// Close Menu When Clicking a Nav Link
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (menuOpen) toggleMenu();
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (menuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
    toggleMenu();
  }
});

// Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const headerOffset = navbar.offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});

// Form Submission with fetch API
const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Replace with your actual form submission logic
      // Example using fetch:
      // const response = await fetch('your-endpoint', {
      //     method: 'POST',
      //     body: formData
      // });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className = "form-success";
      successMsg.textContent = "Message sent successfully!";
      contactForm.appendChild(successMsg);

      // Remove message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);

      contactForm.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}

// Preloader with fade-out animation
window.addEventListener("load", () => {
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    // Remove preloader from DOM after animation completes
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
};

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateOnScroll);

// Dark/Light mode toggle (optional)
const themeToggle = document.querySelector(".theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
}
