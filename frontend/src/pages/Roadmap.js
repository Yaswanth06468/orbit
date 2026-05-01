import { Navbar } from '../components/Navbar.js';
import { storage } from '../utils/storage.js';

export function Roadmap() {
  const resumeData = storage.getResumeData();
  
  if (!resumeData) {
    setTimeout(() => window.location.hash = '#/upload', 0);
    return '';
  }

  const milestones = [
    {
      time: 'Month 1-2',
      title: 'Skill Foundation',
      items: [
        { text: 'Master TypeScript advanced patterns', completed: false },
        { text: 'Complete AWS Cloud Practitioner certification', completed: false },
        { text: 'Refactor portfolio with Next.js', completed: false }
      ],
      tags: ['Technical', 'Certification']
    },
    {
      time: 'Month 3-5',
      title: 'Advanced Specialization',
      items: [
        { text: 'Learn System Design fundamentals', completed: false },
        { text: 'Build a full-stack microservices project', completed: false },
        { text: 'Contribute to 2 major Open Source projects', completed: false }
      ],
      tags: ['Architecture', 'Portfolio']
    },
    {
      time: 'Month 6-9',
      title: 'Leadership & Visibility',
      items: [
        { text: 'Write 3 technical articles on Medium/Dev.to', completed: false },
        { text: 'Practice 20+ mock interviews', completed: false },
        { text: 'Update LinkedIn with new certifications', completed: false }
      ],
      tags: ['Soft Skills', 'Branding']
    },
    {
      time: 'Month 10-12',
      title: 'Market Launch',
      items: [
        { text: 'Apply to top-tier product companies', completed: false },
        { text: 'Negotiate offers using market data', completed: false },
        { text: 'Onboard in your dream role', completed: false }
      ],
      tags: ['Career', 'Final Goal']
    }
  ];

  const html = `
    ${Navbar()}
    <div class="page-section roadmap-page">
      <div class="container">
        <div class="section-header text-center">
          <h1>Your 12-Month Success Roadmap</h1>
          <p>Based on your current skills and target Staff Engineer role, follow this optimized path.</p>
        </div>

        <div class="roadmap-container">
          ${milestones.map((m, idx) => `
            <div class="roadmap-milestone" style="animation-delay: ${idx * 0.1}s">
              <div class="milestone-dot"></div>
              <div class="milestone-header">
                <div>
                  <div class="milestone-time">${m.time}</div>
                  <h3 class="milestone-title">${m.title}</h3>
                </div>
                <div class="milestone-footer" style="margin-top: 0; border: none;">
                  ${m.tags.map(t => `<span class="milestone-tag">${t}</span>`).join('')}
                </div>
              </div>
              <div class="milestone-items">
                ${m.items.map(item => `
                  <label class="milestone-item">
                    <input type="checkbox" ${item.completed ? 'checked' : ''}>
                    <span>${item.text}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="text-center" style="margin-top: 60px;">
          <button class="btn btn-primary btn-lg" id="btn-next-interview">
            Prepare for Interviews <i data-lucide="mic"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    document.getElementById('btn-next-interview').addEventListener('click', () => {
      window.location.hash = '#/interview';
    });
    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
