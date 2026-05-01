import { Navbar } from '../components/Navbar.js';
import { resumeParser } from '../utils/resumeParser.js';
import { storage } from '../utils/storage.js';

export function Upload() {
  const html = `
    ${Navbar()}
    <div class="page-section upload-page">
      <div class="container">
        <div class="section-header text-center">
          <h1>Upload Your Resume</h1>
          <p>Our AI will analyze your skills and experience to find the perfect job matches.</p>
        </div>

        <div class="upload-zone" id="upload-zone">
          <input type="file" id="file-input" accept=".pdf,.docx,.txt">
          <div class="upload-zone-icon">
            <i data-lucide="upload-cloud" style="width: 40px; height: 40px;"></i>
          </div>
          <h3>Click or drag & drop to upload</h3>
          <p>Supported formats: PDF, DOCX, TXT (Max 5MB)</p>
          <div class="upload-formats">
            <span class="badge badge-info">PDF</span>
            <span class="badge badge-info">DOCX</span>
            <span class="badge badge-info">TXT</span>
          </div>
        </div>

        <div id="upload-status" class="hidden">
          <div class="upload-progress">
            <div class="upload-file-info">
              <div class="upload-file-icon"><i data-lucide="file-text"></i></div>
              <div>
                <div class="upload-file-name" id="file-name">resume_2026.pdf</div>
                <div class="upload-file-size" id="file-size">1.2 MB</div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-bar-fill" id="upload-bar" style="width: 0%"></div>
            </div>
            <p class="text-center text-muted" style="margin-top: 12px; font-size: 0.85rem;" id="progress-text">Analyzing your career profile...</p>
          </div>
        </div>

        <div id="resume-preview-container" class="hidden">
           <!-- Preview content injected here after parsing -->
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('file-input');
    const status = document.getElementById('upload-status');
    const bar = document.getElementById('upload-bar');
    const preview = document.getElementById('resume-preview-container');

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
    });

    input.addEventListener('change', () => {
      if (input.files.length) handleFile(input.files[0]);
    });

    async function handleFile(file) {
      zone.classList.add('hidden');
      status.classList.remove('hidden');
      document.getElementById('file-name').textContent = file.name;
      document.getElementById('file-size').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      
      // Animate progress bar
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        bar.style.width = progress + '%';
        if (progress >= 100) clearInterval(interval);
      }, 100);

      try {
        const parsedData = await resumeParser.parse(file);
        clearInterval(interval);
        bar.style.width = '100%';
        storage.setResumeData(parsedData);
        renderPreview(parsedData);
      } catch (error) {
        clearInterval(interval);
        alert("Error parsing PDF: " + error.message);
        zone.classList.remove('hidden');
        status.classList.add('hidden');
      }
    }

    function renderPreview(data) {
      preview.innerHTML = `
        <div class="resume-preview">
          <div class="resume-section">
            <h3><i data-lucide="user"></i> Personal Info</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
          </div>
          <div class="resume-section">
            <h3><i data-lucide="award"></i> Skills</h3>
            <div class="resume-skills-list">
              ${data.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
            </div>
          </div>
          <div class="resume-section" style="grid-column: span 2;">
            <h3><i data-lucide="briefcase"></i> Experience</h3>
            ${data.experience.map(exp => `
              <div class="experience-item">
                <h4>${exp.role}</h4>
                <div class="company">${exp.company}</div>
                <div class="duration">${exp.duration}</div>
                <p style="font-size: 0.85rem; margin-top: 8px;">${exp.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="text-center" style="margin-top: 40px;">
          <button class="btn btn-primary btn-lg" id="btn-next-ats">
            Calculate ATS Score <i data-lucide="trending-up"></i>
          </button>
        </div>
      `;
      
      preview.classList.remove('hidden');
      status.classList.add('hidden');
      
      document.getElementById('btn-next-ats').addEventListener('click', () => {
        window.location.hash = '#/ats';
      });
      
      if (window.lucide) window.lucide.createIcons();
    }

    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
