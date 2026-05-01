import { mlEngine } from './mlEngine.js';
import { jobListings } from '../data/jobListings.js';

export const jobMatcher = {
  getMatches: (resumeText) => {
    return jobListings.map(job => {
      // Create a combined string of job requirements for ML analysis
      const jobContent = `${job.title} ${job.company} ${job.skills.join(' ')} ${job.location}`;
      
      // Use ML Cosine Similarity to predict match percentage
      const predictedScore = mlEngine.predictMatch(resumeText, jobContent);
      
      // We normalize the score a bit so it's not too low (since jobs have less text than resumes)
      const adjustedScore = Math.min(Math.round(predictedScore * 3.5) + 40, 98);
      
      return {
        ...job,
        matchScore: adjustedScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }
};
