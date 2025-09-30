// Initialize demo data for WebKech Dashboard
export const initializeDemoData = () => {
  // Check if demo data already exists
  const existingUsers = localStorage.getItem('webkech_users');
  
  if (!existingUsers) {
    // Create demo user
    const demoUser = {
      id: 'demo-user-1',
      email: 'demo@webkech.com',
      createdAt: new Date().toISOString()
    };

    // Store demo user
    localStorage.setItem('webkech_users', JSON.stringify([demoUser]));
    localStorage.setItem('webkech_credentials', JSON.stringify([
      { email: 'demo@webkech.com', password: 'demo123', userId: 'demo-user-1' }
    ]));
  }
};

// Call this function when the app starts
initializeDemoData();