export function ScoreGauge(score) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  let color = 'var(--clr-danger)';
  if (score >= 80) color = 'var(--clr-success)';
  else if (score >= 60) color = 'var(--clr-warning)';

  return `
    <div class="score-gauge">
      <svg>
        <circle class="score-gauge-bg" cx="100" cy="100" r="${radius}"></circle>
        <circle class="score-gauge-fill" cx="100" cy="100" r="${radius}" 
          style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference}; stroke: ${color};"
          id="ats-gauge-fill">
        </circle>
      </svg>
      <div class="score-value">
        <span class="score-number">${score}</span>
        <span class="score-label">ATS Score</span>
      </div>
    </div>
  `;
}

export function initGauge(score) {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  setTimeout(() => {
    const fill = document.getElementById('ats-gauge-fill');
    if (fill) fill.style.strokeDashoffset = offset;
  }, 100);
}
