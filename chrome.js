function buildChrome(activePage) {

  const nav = [
    { href: "index.html", label: "Home", id: "home" },
    { href: "about.html", label: "About", id: "about" },
    { href: "services.html", label: "Services", id: "services" },
    { href: "projects.html", label: "Projects", id: "projects" },
    { href: "blog.html", label: "Blog", id: "blog" },
    { href: "contact.html", label: "Contact", id: "contact" }
  ];

  const navLinks = nav.map(n => `
    <a href="${n.href}" class="pill-link${activePage === n.id ? ' active' : ''}">
      ${activePage === n.id ? '<span class="pill-active-bg"></span>' : ''}
      <span class="pill-link-label">${n.label}</span>
    </a>
  `).join('');

  const drawerLinks = nav.map(n =>
    `<a href="${n.href}" class="${activePage === n.id ? 'active' : ''}">${n.label}</a>`
  ).join('');

  const navbarHTML = `
    <div class="scroll-progress"></div>

    <div class="preloader">
      <div class="preloader-mark">
        <img src="./stackly-removebg-preview.png" alt="STACKLY" class="preloader-logo">
      </div>
    </div>

    <nav class="navbar">
      <div class="nav-pill-wrap">

        <a href="index.html" class="nav-logo-standalone">
          <img src="./stackly-removebg-preview.png" alt="STACKLY" class="nav-logo-img">
        </a>

        <div class="nav-pill">
          <div class="pill-links">
            ${navLinks}
          </div>
        </div>

        <div class="nav-actions-standalone">
          <a href="login.html" class="btn btn-outline btn-sm">Log in</a>

          <button class="nav-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

      </div>
    </nav>

    <div class="mobile-drawer">
      <button class="mobile-drawer-close">&times;</button>
      ${drawerLinks}
      <a href="login.html">Log in</a>
    </div>
  `;

  const footerHTML = `
    <footer>
      <div class="container">

        <div class="footer-top">

          <div class="footer-brand">

            <a href="index.html">
              <img src="./stackly-removebg-preview.png"
                   alt="STACKLY"
                   class="footer-logo">
            </a>

            <p>
              A performance-driven digital marketing agency turning
              attention into revenue for ambitious brands since 2016.
            </p>

            <div class="footer-social">
              <a href="./Error.html" class="footer-social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34v-7.7H5.7v7.7h2.64zM7.02 9.6a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06zm11.32 8.74v-4.23c0-2.26-1.21-3.32-2.83-3.32-1.3 0-1.88.72-2.2 1.22v-1.05h-2.64c.03.7 0 7.38 0 7.38h2.64v-4.12c0-.22.02-.44.08-.6.18-.44.58-.9 1.27-.9.9 0 1.26.68 1.26 1.68v3.94h2.42z"/>
                </svg>
              </a>
              <a href="./Error.html" class="footer-social-icon" aria-label="Twitter / X">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9 2H22l-7.2 8.23L23 22h-6.6l-5.17-6.77L5 22H2l7.7-8.8L1.4 2H8.1l4.66 6.17L18.9 2zm-2.32 18h1.83L7.51 4H5.56l11.02 16z"/>
                </svg>
              </a>
              <a href="./Error.html" class="footer-social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.27-2.91.57a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .62 4.16c-.3.76-.5 1.63-.56 2.91C0 8.35 0 8.76 0 12s.01 3.65.07 4.93c.06 1.28.27 2.15.57 2.91.3.79.7 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.63.5 2.91.56C8.33 24 8.74 24 12 24s3.65-.01 4.93-.07c1.28-.06 2.15-.27 2.91-.57a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.93s-.01-3.65-.07-4.93c-.06-1.28-.27-2.15-.57-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.84.62c-.76-.3-1.63-.5-2.91-.56C15.65 0 15.24 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.84a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                </svg>
              </a>
              <a href="./Error.html" class="footer-social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
                </svg>
              </a>
            </div>

          </div>

          <div class="footer-col">
            <h4>Agency</h4>
            <a href="index.html">Home</a>
            <a href="about.html">About us</a>
            <a href="services.html">Services</a>
            <a href="projects.html">Projects</a>
            <a href="blog.html">Blog</a>
           </div>
          <div class="footer-col">
            <h4>Work with us</h4>
            <a href="contact.html">Start a project</a>
            <a href="contact.html">Book a strategy call</a>
            <a href="services.html">View pricing</a>
          </div>

          <div class="footer-col">
            <h4>Contact</h4>
            <p>📧 hello@stackly.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 MMR complex,Salem,Tamil Nadu.</p>
          </div>

        </div>

        <div class="footer-bottom">
          <span>© 2026 Stackly Agency. All rights reserved.</span>

          <div class="footer-bottom-links">
            <a href="./Error.html">Privacy Policy</a>
            <a href="./Error.html">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  `;

  document.getElementById("site-nav").innerHTML = navbarHTML;
  document.getElementById("site-footer").innerHTML = footerHTML;
}
