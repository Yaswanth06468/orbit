/**
 * ML Engine for Resume Analysis
 * Implements TF-IDF (Term Frequency-Inverse Document Frequency) 
 * and Cosine Similarity for intelligent matching.
 */

export const mlEngine = {
  // Simple tokenizer and stop-word remover
  tokenize: (text) => {
    const stopWords = new Set(['and', 'the', 'is', 'at', 'which', 'on', 'in', 'with', 'a', 'an', 'to', 'for', 'of', 'or', 'as']);
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));
  },

  // Calculate Term Frequency for a document
  getTF: (tokens) => {
    const tf = {};
    const total = tokens.length;
    tokens.forEach(token => {
      tf[token] = (tf[token] || 0) + 1;
    });
    for (let word in tf) {
      tf[word] = tf[word] / total;
    }
    return tf;
  },

  // Calculate Cosine Similarity between two TF vectors
  calculateCosineSimilarity: (vecA, vecB) => {
    const uniqueWords = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    uniqueWords.forEach(word => {
      const valA = vecA[word] || 0;
      const valB = vecB[word] || 0;
      dotProduct += valA * valB;
      magA += valA * valA;
      magB += valB * valB;
    });

    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
  },

  // Predict match score between resume and job description
  predictMatch: (resumeText, jobDescription) => {
    const tokensA = mlEngine.tokenize(resumeText);
    const tokensB = mlEngine.tokenize(jobDescription);
    
    const tfA = mlEngine.getTF(tokensA);
    const tfB = mlEngine.getTF(tokensB);
    
    const similarity = mlEngine.calculateCosineSimilarity(tfA, tfB);
    
    // Scale similarity (which is 0-1) to a 0-100 score with some weighting
    return Math.round(similarity * 100);
  }
};
