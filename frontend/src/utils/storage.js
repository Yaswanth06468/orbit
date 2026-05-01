export const storage = {
  setResumeData: (data) => localStorage.setItem('orbit_resume', JSON.stringify(data)),
  getResumeData: () => JSON.parse(localStorage.getItem('orbit_resume')),
  
  setAtsResults: (data) => localStorage.setItem('orbit_ats', JSON.stringify(data)),
  getAtsResults: () => JSON.parse(localStorage.getItem('orbit_ats')),
  
  clear: () => {
    localStorage.removeItem('orbit_resume');
    localStorage.removeItem('orbit_ats');
  }
};
