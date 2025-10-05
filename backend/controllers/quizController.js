const pool = require('../db');
require('dotenv').config();

const getQuiz = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, text, options FROM questions ORDER BY id;'
    );

    res.json({
      quizDuration: 120,
      questions: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;
    const results = [];

    for (let ans of answers) {
      const result = await pool.query(
        'SELECT correct_option FROM questions WHERE id = $1',
        [ans.questionId]
      );
      const correctOption = result.rows[0].correct_option;
      const isCorrect = correctOption === ans.selected;
      if (isCorrect) score++;
      results.push({ questionId: ans.questionId, correct: isCorrect });
    }

    res.json({
      score,
      total: answers.length,
      results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to calculate score' });
  }
};

module.exports = { getQuiz, submitQuiz };
