const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quiz');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/quiz', quizRoutes);
app.get('/api', (req, res) => {
  res.send('hellsos');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    'server is runnig on port ',
    PORT,
    'url - ',
    `http://localhost:${PORT}/api/quiz`
  );
});
