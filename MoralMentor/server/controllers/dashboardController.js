// server/controllers/dashboardController.js

const User = require('../models/User');
const Quiz = require('../models/Quiz'); 

// Get dashboard data for a user
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    // Fetch user data including badges and points
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Count completed quizzes
    const completedQuizzes = await Quiz.countDocuments({
      userId: userId,
      completed: true
    });
    
    const badges = user.badges || [];
    
    const bestLessons = [
      { title: 'Plagiarism', icon: '📝' },
      { title: 'Loyalty', icon: '🤝' }
    ];
    
    // Return dashboard data
    return res.status(200).json({
      quizzesCompleted: completedQuizzes,
      learningStreak: user.learningStreak || 0,
      badgesEarned: badges.length,
      badges: badges,
      bestLessons: bestLessons
    });
    
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    return res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

