/* ============================================
   STACKLY — Shared chrome (navbar + footer + preloader)
   Injected on DOMContentLoaded so every page stays in sync
   ============================================ */

function buildChrome(activePage){
  const nav = [
    {href:'index.html', label:'Home', id:'home'},
    {href:'about.html', label:'About', id:'about'},
    {href:'services.html', label:'Services', id:'services'},
    {href:'projects.html', label:'Projects', id:'projects'},
    {href:'blog.html', label:'Blog', id:'blog'},
    {href:'contact.html', label:'Contact', id:'contact'},
  ];

  const navLinks = nav.map(n => `<a href="${n.href}" class="${activePage===n.id ? 'active':''}">${n.label}</a>`).join('');
  const drawerLinks = nav.map(n => `<a href="${n.href}">${n.label}</a>`).join('');

  const navbarHTML = `
  <div class="scroll-progress"></div>
  <div class="preloader">
    <div class="preloader-mark">
      <img src="logo-stackly.png" alt="STACKLY" class="preloader-logo">
    </div>
  </div>
  <nav class="navbar">
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="logo-stackly.png" alt="STACKLY" class="nav-logo-img" style="margin-bottom:18px">
      </a>
      <div class="nav-links">${navLinks}</div>
      <div class="nav-actions">
        <a href="login.html" class="btn btn-outline btn-sm">Log in</a>
      
        <button class="nav-burger" aria-label="Open menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>
  <div class="mobile-drawer">
    <button class="mobile-drawer-close" aria-label="Close menu">&times;</button>
    ${drawerLinks}
    <a href="login.html">Log in</a>
  </div>`;

  const footerHTML = `
  <footer>
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <img src="logo-stackly.png" alt="STACKLY" class="nav-logo-img" style="margin-bottom:18px">
            STACKLY
          </a>
          <p>A performance-driven digital marketing agency turning attention into revenue for ambitious brands since 2016.</p>
          <div class="footer-social">
            <a href="#" aria-label="X / Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h3l-7.5 8.5L22 22h-6.5l-5-6.5L4.5 22H1.5l8-9L1 2h6.5l4.5 6 6-6z" fill="currentColor"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4.5 3.5a2 2 0 110 4 2 2 0 010-4zM3 9h3v12H3V9zm6 0h3v1.7c.6-1 1.7-1.9 3.3-1.9 3.5 0 4.2 2.3 4.2 5.3V21h-3v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21H9V9z" fill="currentColor"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Agency</h4>
          <a href="about.html">About us</a>
          <a href="services.html">Services</a>
          <a href="projects.html">Projects</a>
          <a href="blog.html">Blog</a>
        </div>
        <div class="footer-col">
          <h4>Account</h4>
          <a href="login.html">Log in</a>
          <a href="signup.html">Create account</a>
          <a href="user-dashboard.html">Client dashboard</a>
          <a href="admin-dashboard.html">Admin dashboard</a>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <p>hello@stackly.agency</p>
          <p>+1 (415) 555-0142</p>
          <p>148 Lafayette St, New York, NY</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 Stackly Agency. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of service</a>
        </div>
      </div>
    </div>
  </footer>`;

  document.getElementById('site-nav').innerHTML = navbarHTML;
  document.getElementById('site-footer').innerHTML = footerHTML;
}
