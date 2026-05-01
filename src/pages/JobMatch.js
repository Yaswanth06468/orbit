import { Navbar } from '../components/Navbar.js';
import { careerProfiles } from '../data/careerProfiles.js';
import { storage } from '../utils/storage.js';
import { jobMatcher } from '../utils/jobMatcher.js';

export function JobMatch() {
  const resumeData = storage.getResumeData();
  
  if (!resumeData) {
    setTimeout(() => window.location.hash = '#/upload', 0);
    return '';
  }

  const matches = jobMatcher.getMatches(resumeData.rawText || "");

  const html = `
    ${Navbar()}
    <div class="page-section jobmatch-page">
      <div class="container">
        <div class="tabs">
          <button class="tab-btn active" id="tab-jobs">Job Matches</button>
          <button class="tab-btn" id="tab-twins">Career Twins</button>
        </div>

        <div id="jobs-content">
          <div class="section-header">
            <h1>Top Job Matches</h1>
            <p>We found ${matches.length} roles that align with your profile and ATS score.</p>
          </div>
          
          <div class="job-cards">
            ${matches.map(job => `
              <div class="job-card">
                <div class="job-card-header">
                  <div>
                    <h3>${job.title}</h3>
                    <div class="company">${job.company}</div>
                    <div class="location"><i data-lucide="map-pin" style="width: 12px; height: 12px;"></i> ${job.location}</div>
                  </div>
                  <div class="match-percent ${job.matchScore >= 80 ? 'match-high' : job.matchScore >= 50 ? 'match-medium' : 'match-low'}">
                    ${job.matchScore}%
                  </div>
                </div>
                
                <div class="job-skills">
                  ${job.skills.map(s => `<span class="job-skill match">${s}</span>`).join('')}
                  ${job.missingSkills.map(s => `<span class="job-skill gap">${s}</span>`).join('')}
                </div>
                
                <div class="job-card-footer">
                  <div class="salary">${job.salary}</div>
                  <button class="btn btn-secondary btn-sm">View Details</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div id="twins-content" class="hidden">
          <div class="section-header">
            <h1>Career Twins</h1>
            <p>Profiles of successful professionals whose journey started similarly to yours.</p>
          </div>

          <div class="twin-cards">
            ${careerProfiles.map(twin => `
              <div class="twin-card">
                <div class="twin-header">
                  <div class="twin-avatar">${twin.name.charAt(0)}</div>
                  <div class="twin-info">
                    <h3>${twin.name}</h3>
                    <div class="role">${twin.currentRole}</div>
                    <div class="similarity"><i data-lucide="zap" style="width: 12px;"></i> ${twin.similarity}% Similarity</div>
                  </div>
                </div>

                <div class="twin-insight">
                  <strong>Success Insight:</strong> ${twin.insight}
                </div>

                <div class="twin-timeline">
                  ${twin.trajectory.map(step => `
                    <div class="timeline-item">
                      <span class="timeline-year">${step.year}</span>
                      <span>${step.role} at ${step.company}</span>
                    </div>
                  `).join('')}
                </div>
                
                <button class="btn btn-ghost btn-sm" style="margin-top: 16px; width: 100%;">Connect on LinkedIn</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="text-center" style="margin-top: 60px;">
          <button class="btn btn-primary btn-lg" id="btn-next-roadmap">
            Get My Success Roadmap <i data-lucide="map"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const jobTab = document.getElementById('tab-jobs');
    const twinTab = document.getElementById('tab-twins');
    const jobContent = document.getElementById('jobs-content');
    const twinContent = document.getElementById('twins-content');

    jobTab.addEventListener('click', () => {
      jobTab.classList.add('active');
      twinTab.classList.remove('active');
      jobContent.classList.remove('hidden');
      twinContent.classList.add('hidden');
    });

    twinTab.addEventListener('click', () => {
      twinTab.classList.add('active');
      jobTab.classList.remove('active');
      twinContent.classList.remove('hidden');
      jobContent.classList.add('hidden');
    });

    document.getElementById('btn-next-roadmap').addEventListener('click', () => {
      window.location.hash = '#/roadmap';
    });

    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
