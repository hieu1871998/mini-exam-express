const express = require('express');
const app = express();
const port = 1870;
const questions = require('./data/questions.json');
const cors = require('cors');

app.use(cors());

app.get('/questions', (req, res) => {
  res.send(questions);
});

app.get('/', (req, res) => {
  res.send('Hello!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});