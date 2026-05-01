import { Navbar } from '../components/Navbar.js';
import { interviewQuestions } from '../data/interviewQuestions.js';

export function MockInterview() {
  const html = `
    ${Navbar()}
    <div class="page-section interview-page">
      <div class="container">
        <div id="interview-setup-view">
          <div class="section-header text-center">
            <h1>AI Mock Interview</h1>
            <p>Practice with personalized questions and get instant AI feedback on your performance.</p>
          </div>
          
          <div class="interview-setup stagger-in">
            <div class="feature-icon purple" style="margin: 0 auto 24px;"><i data-lucide="mic"></i></div>
            <h2>Ready to start?</h2>
            <p class="text-muted" style="margin-bottom: 32px;">This session includes 5 questions (Technical & Behavioral) tailored to your resume.</p>
            <div style="display: flex; gap: 16px; justify-content: center;">
              <button class="btn btn-primary btn-lg" id="btn-start-interview">Start Session</button>
              <button class="btn btn-secondary btn-lg">Settings</button>
            </div>
          </div>
        </div>

        <div id="interview-live-view" class="hidden">
           <div class="interview-live">
              <div class="interview-question-card">
                <div class="question-header">
                  <span class="question-number" id="q-num">Question 1 of 5</span>
                  <div class="interview-timer" id="q-timer">02:00</div>
                </div>
                <h2 class="question-text" id="q-text">Can you explain the difference between REST and GraphQL?</h2>
                <div class="answer-area">
                  <textarea id="answer-input" placeholder="Type your answer here... Use the STAR method for behavioral questions."></textarea>
                </div>
                <div class="interview-controls">
                  <button class="btn btn-ghost" id="btn-skip">Skip</button>
                  <button class="btn btn-primary" id="btn-submit-answer">Submit Answer</button>
                </div>
              </div>
           </div>
        </div>

        <div id="interview-result-view" class="hidden">
           <div class="section-header text-center">
            <h1>Interview Performance</h1>
            <p>Great job! Here is your AI-generated feedback.</p>
          </div>
          
          <div class="interview-feedback">
            <div class="feedback-score">
              <span class="num">82</span>
              <span class="label">/ 100 Overall Score</span>
            </div>
            
            <div class="feedback-points">
              <div class="feedback-point">
                <h5><i data-lucide="check-circle" style="width: 14px;"></i> Strengths</h5>
                <p>Excellent explanation of technical concepts. Good use of specific examples from your past projects.</p>
              </div>
              <div class="feedback-point">
                <h5><i data-lucide="trending-up" style="width: 14px;"></i> Areas to Improve</h5>
                <p>Try to be more concise in behavioral answers. Focus more on the "Result" part of the STAR method.</p>
              </div>
              <div class="feedback-point">
                <h5><i data-lucide="key" style="width: 14px;"></i> Keyword Coverage</h5>
                <p>You mentioned 8/10 critical keywords for this role. Missing: "Scalability", "Unit Testing".</p>
              </div>
              <div class="feedback-point">
                <h5><i data-lucide="zap" style="width: 14px;"></i> Tone & Clarity</h5>
                <p>Professional tone throughout. Confidence score: 90%. Clarity: 85%.</p>
              </div>
            </div>
            
            <div class="text-center" style="margin-top: 32px;">
              <button class="btn btn-primary" id="btn-restart">Try Another Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  setTimeout(() => {
    const setupView = document.getElementById('interview-setup-view');
    const liveView = document.getElementById('interview-live-view');
    const resultView = document.getElementById('interview-result-view');
    const startBtn = document.getElementById('btn-start-interview');
    const submitBtn = document.getElementById('btn-submit-answer');
    const restartBtn = document.getElementById('btn-restart');

    const questions = [
      ...interviewQuestions.technical.slice(0, 3),
      ...interviewQuestions.behavioral.slice(0, 2)
    ];
    let currentQ = 0;

    startBtn.addEventListener('click', () => {
      setupView.classList.add('hidden');
      liveView.classList.remove('hidden');
      loadQuestion();
    });

    submitBtn.addEventListener('click', () => {
      currentQ++;
      if (currentQ < questions.length) {
        loadQuestion();
      } else {
        liveView.classList.add('hidden');
        resultView.classList.remove('hidden');
      }
    });

    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });

    function loadQuestion() {
      document.getElementById('q-num').textContent = `Question ${currentQ + 1} of ${questions.length}`;
      document.getElementById('q-text').textContent = questions[currentQ];
      document.getElementById('answer-input').value = '';
    }

    if (window.lucide) window.lucide.createIcons();
  }, 0);

  return html;
}
