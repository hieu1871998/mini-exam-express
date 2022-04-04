const express = require('express');
const app = express();
const port = 1870;
const questions = require('./data/questions.json');
const applicants = require('./data/applicants.json')
const cors = require('cors');

app.use(cors());

app.get('/questions', (req, res) => {
  res.send(questions);
});

app.get('/applicants', (req, res) => {
  res.send(applicants);
});

app.get('/questions/:id', (req, res) => {
  res.send(JSON.stringify({ responseData: questions.find((question) => question.id == req.params.id)}));
})

app.get('/applicants/:id', (req, res) => {
  res.send(JSON.stringify({ responseData: applicants.find((question) => applicants.id == req.params.id)}));
})

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});