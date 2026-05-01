import './styles/index.css';
import './styles/landing.css';
import './styles/upload.css';
import './styles/ats-score.css';
import './styles/job-match.css';
import './styles/roadmap.css';
import './styles/mock-interview.css';
import './styles/recruitment.css';

import { Landing } from './pages/Landing.js';
import { Upload } from './pages/Upload.js';
import { ATSScore } from './pages/ATSScore.js';
import { JobMatch } from './pages/JobMatch.js';
import { Roadmap } from './pages/Roadmap.js';
import { MockInterview } from './pages/MockInterview.js';
import { Recruitment } from './pages/Recruitment.js';

// Initialize PDF.js worker
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const routes = {
  '/': Landing,
  '/upload': Upload,
  '/ats': ATSScore,
  '/jobs': JobMatch,
  '/roadmap': Roadmap,
  '/interview': MockInterview,
  '/recruiter': Recruitment
};

function router() {
  const path = window.location.hash.slice(1) || '/';
  const page = routes[path] || Landing;
  const app = document.getElementById('app');
  
  app.innerHTML = '';
  
  const container = document.createElement('div');
  container.className = 'page-enter';
  container.innerHTML = page();
  app.appendChild(container);
  
  if (window.lucide) window.lucide.createIcons();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
