import { storage } from '../utils/storage.js';

export function Navbar() {
  const currentPath = window.location.hash || '#/';
  
  const navItems = [
    { label: 'Home', path: '#/' },
    { label: 'ATS Score', path: '#/ats' },
    { label: 'Job Match', path: '#/jobs' },
    { label: 'Roadmap', path: '#/roadmap' },
    { label: 'Interview', path: '#/interview' }
  ];

  const html = `
    <nav class="navbar" id="main-navbar">
      <div class="navbar-inner">
        <div class="navbar-logo" id="nav-logo">
          <svg viewBox="0 0 64 64"><use href="/favicon.svg#g"></use>
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="3"/>
            <circle cx="32" cy="32" r="6" fill="currentColor"/>
          </svg>
          <span>ORBIT</span>
        </div>
        
        <ul class="navbar-links" id="nav-links">
          ${navItems.map(item => `
            <li><a href="${item.path}" class="${currentPath === item.path ? 'active' : ''}">${item.label}</a></li>
          `).join('')}
          <li><a href="#/recruiter" class="btn btn-secondary btn-sm" style="margin-left: 16px;">Recruiter</a></li>
        </ul>

        <button class="navbar-toggle" id="nav-toggle">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </nav>
  `;

  setTimeout(() => {
    const nav = document.getElementById('main-navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    const logo = document.getElementById('nav-logo');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });

    toggle.addEventListener('click', () => links.classList.toggle('open'));
    logo.addEventListener('click', () => window.location.hash = '#/');

    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
