import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Mock Resume Analysis Endpoint
app.post('/api/analyze', (req, res) => {
  const { resumeText } = req.body;
  
  if (!resumeText) {
    return res.status(400).json({ error: 'No resume text provided' });
  }

  // In a real app, this would call OpenAI or a python ML service
  res.json({
    message: 'Analysis successful (simulated on backend)',
    insights: [
      'Your profile has high potential for Lead Roles',
      'Recommended to add more Cloud certifications',
      'Strong match for high-growth tech ecosystems'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Orbit Backend running on port ${PORT}`);
});
