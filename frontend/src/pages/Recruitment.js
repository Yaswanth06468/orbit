import { Navbar } from '../components/Navbar.js';

export function Recruitment() {
  const candidates = [
    { name: 'John Doe', role: 'Full Stack Dev', score: 92, status: 'Shortlisted', initial: 'JD' },
    { name: 'Alice Smith', role: 'Frontend Lead', score: 88, status: 'Applied', initial: 'AS' },
    { name: 'Robert Brown', role: 'Backend Engineer', score: 74, status: 'Applied', initial: 'RB' },
    { name: 'Elena Vance', role: 'UI Architect', score: 95, status: 'Shortlisted', initial: 'EV' },
    { name: 'David Miller', role: 'React Developer', score: 62, status: 'Rejected', initial: 'DM' }
  ];

  const html = `
    ${Navbar()}
    <div class="page-section recruiter-page">
      <div class="container">
        <div class="dashboard-header">
          <div>
            <h1>Recruitment Dashboard</h1>
            <p>Manage candidate pipeline and talent insights.</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button class="btn btn-secondary"><i data-lucide="download"></i> Export Reports</button>
            <button class="btn btn-primary"><i data-lucide="plus"></i> Post New Job</button>
          </div>
        </div>

        <div class="dashboard-stats">
          <div class="dash-stat-card">
            <div class="dash-stat-icon purple"><i data-lucide="users"></i></div>
            <div class="dash-stat-info">
              <h4>128</h4>
              <p>Total Candidates</p>
            </div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-icon cyan"><i data-lucide="file-check"></i></div>
            <div class="dash-stat-info">
              <h4>42</h4>
              <p>Shortlisted</p>
            </div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-icon green"><i data-lucide="trending-up"></i></div>
            <div class="dash-stat-info">
              <h4>84%</h4>
              <p>Avg. ATS Score</p>
            </div>
          </div>
          <div class="dash-stat-card">
            <div class="dash-stat-icon pink"><i data-lucide="clock"></i></div>
            <div class="dash-stat-info">
              <h4>12d</h4>
              <p>Time to Hire</p>
            </div>
          </div>
        </div>

        <div class="candidates-table-wrap">
          <div class="table-filters">
            <input type="text" placeholder="Search candidates..." style="flex: 1; min-width: 200px;">
            <select>
              <option>Filter by Score</option>
              <option>90% +</option>
              <option>80% +</option>
            </select>
            <select>
              <option>All Statuses</option>
              <option>Shortlisted</option>
              <option>Applied</option>
            </select>
          </div>
          <table class="candidates-table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Target Role</th>
                <th>ATS Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${candidates.map(c => `
                <tr>
                  <td>
                    <div class="candidate-info">
                      <div class="candidate-avatar">${c.initial}</div>
                      <div class="candidate-name">${c.name}</div>
                    </div>
                  </td>
                  <td>${c.role}</td>
                  <td>
                    <span class="ats-score-pill ${c.score >= 90 ? 'score-high' : c.score >= 80 ? 'score-med' : 'score-low'}">
                      ${c.score}%
                    </span>
                  </td>
                  <td>
                    <span class="status-pill status-${c.status.toLowerCase()}">${c.status}</span>
                  </td>
                  <td>
                    <button class="btn btn-ghost btn-icon"><i data-lucide="eye"></i></button>
                    <button class="btn btn-ghost btn-icon"><i data-lucide="more-horizontal"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
