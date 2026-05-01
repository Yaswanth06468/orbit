import { Navbar } from '../components/Navbar.js';
import { ScoreGauge, initGauge } from '../components/ScoreGauge.js';
import { atsScorer } from '../utils/atsScorer.js';
import { storage } from '../utils/storage.js';

export function ATSScore() {
  const resumeData = storage.getResumeData();
  
  if (!resumeData) {
    setTimeout(() => window.location.hash = '#/upload', 0);
    return '';
  }

  const results = atsScorer.calculateScore(resumeData);
  storage.setAtsResults(results);

  const html = `
    ${Navbar()}
    <div class="page-section ats-page">
      <div class="container">
        <div class="section-header">
          <h1>ATS Analysis Dashboard</h1>
          <p>Here's how your resume performs against modern Applicant Tracking Systems.</p>
        </div>

        <div class="ats-hero">
          <div class="score-gauge-wrap">
            ${ScoreGauge(results.overall)}
            <div class="score-status" style="color: ${results.overall >= 80 ? 'var(--clr-success)' : 'var(--clr-warning)'}">
              ${results.overall >= 80 ? 'Strong Match' : 'Optimization Needed'}
            </div>
          </div>

          <div class="ats-breakdown">
            ${results.breakdown.map(item => `
              <div class="breakdown-item">
                <div class="breakdown-header">
                  <h4><i data-lucide="${item.icon}"></i> ${item.label}</h4>
                  <span class="breakdown-score">${item.score}%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${item.score}%; background: ${item.score >= 80 ? 'var(--clr-success)' : 'var(--clr-primary)'}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="ats-recommendations">
          ${results.recommendations.map(rec => `
            <div class="recommendation-card">
              <h4><i data-lucide="info"></i> ${rec.category} Improvements</h4>
              <ul>
                ${rec.items.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
          
          <div class="recommendation-card" style="grid-column: span 2;">
            <h4><i data-lucide="key"></i> Missing Keywords</h4>
            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 12px;">Adding these keywords can significantly improve your match rate for target roles.</p>
            <div class="missing-keywords">
              ${results.missingKeywords.map(kw => `<span class="keyword-missing">${kw}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="text-center" style="margin-top: 40px; display: flex; justify-content: center; gap: 16px;">
          <button class="btn btn-secondary btn-lg" id="btn-reupload">
            <i data-lucide="refresh-cw"></i> Re-upload
          </button>
          <button class="btn btn-primary btn-lg" id="btn-next-jobs">
            View Job Matches <i data-lucide="target"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    initGauge(results.overall);
    
    document.getElementById('btn-reupload').addEventListener('click', () => {
      window.location.hash = '#/upload';
    });
    
    document.getElementById('btn-next-jobs').addEventListener('click', () => {
      window.location.hash = '#/jobs';
    });

    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
