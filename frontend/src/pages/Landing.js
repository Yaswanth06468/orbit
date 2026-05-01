import { Navbar } from '../components/Navbar.js';

export function Landing() {
  const html = `
    ${Navbar()}
    
    <main class="landing-page">
      <section class="landing-hero">
        <div class="hero-orbit">
          <div class="hero-orbit-dot"></div>
        </div>
        <div class="hero-orbit"></div>
        <div class="hero-orbit"></div>
        
        <div class="hero-content">
          <div class="hero-badge">
            <i data-lucide="sparkles"></i>
            <span>AI-Powered Talent Intelligence</span>
          </div>
          <h1 class="hero-title">Launch Your Career <br><span class="text-gradient">Into Orbit</span></h1>
          <p class="hero-subtitle">Optimize your resume, simulate interviews, and match with the perfect roles using our intelligent talent insight engine.</p>
          <div class="hero-cta">
            <button class="btn btn-primary btn-lg" id="btn-start">
              Get Started Free <i data-lucide="arrow-right"></i>
            </button>
            <button class="btn btn-secondary btn-lg" id="btn-demo">View Demo</button>
          </div>
          
          <div class="landing-stats">
            <div class="stat-item">
              <div class="stat-number">50k+</div>
              <div class="stat-label">Resumes Analyzed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">94%</div>
              <div class="stat-label">ATS Success Rate</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">12k+</div>
              <div class="stat-label">Career Roadmaps</div>
            </div>
          </div>
        </div>
      </section>

      <section class="landing-features">
        <div class="container">
          <div class="section-header text-center">
            <h2>Intelligent Features</h2>
            <p>Everything you need to stand out in today's competitive job market.</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon purple"><i data-lucide="file-text"></i></div>
              <h3>ATS Optimization</h3>
              <p>Get instant feedback on your resume with our advanced scoring engine that mimics top-tier ATS systems.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon cyan"><i data-lucide="target"></i></div>
              <h3>Job Matching</h3>
              <p>Discover roles that match your unique skill set with detailed gap analysis and success probability.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon pink"><i data-lucide="users"></i></div>
              <h3>Career Twin</h3>
              <p>Identify successful professionals with similar backgrounds and see the exact path they took to success.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon green"><i data-lucide="map"></i></div>
              <h3>Smart Roadmaps</h3>
              <p>Receive a personalized 12-month skill acquisition plan to reach your target career milestone.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon yellow"><i data-lucide="mic"></i></div>
              <h3>Mock Interviews</h3>
              <p>Practice with AI-generated questions tailored to your resume and specific job descriptions.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon blue"><i data-lucide="layout-dashboard"></i></div>
              <h3>Recruiter Insights</h3>
              <p>A dedicated dashboard for hiring managers to find and filter top-tier talent effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="landing-how">
        <div class="container">
          <div class="section-header text-center">
            <h2>How It Works</h2>
          </div>
          <div class="how-steps">
            <div class="step-card">
              <div class="step-number">1</div>
              <h3>Upload Resume</h3>
              <p>Upload your current resume in PDF or DOCX format.</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our engine parses and scores your profile against job data.</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <h3>Get Roadmap</h3>
              <p>Follow your personalized path to your dream job.</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="landing-footer">
        <p>&copy; 2026 Orbit AI. Built for the future of work.</p>
      </footer>
    </main>
  `;

  setTimeout(() => {
    document.getElementById('btn-start').addEventListener('click', () => {
      window.location.hash = '#/upload';
    });
    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
