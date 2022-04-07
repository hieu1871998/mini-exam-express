const express = require('express');
const app = express();
const port = 3187;
const questions = require('./data/questions.json');
const test = require('./data/questions.json');
const applicants = require('./data/applicants.json')
const cors = require('cors');


app.use(cors());

app.get('/questions', (req, res) => {
  const { pageSize, pageIndex } = req.query;
  const reqData = questions.slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
  res.send({responseData: reqData});
});

app.get('/applicants', (req, res) => {
  const { pageSize, pageIndex } = req.query;
  const reqData = applicants.slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
  res.send({responseData: reqData});
});

app.get('/questions/:id', (req, res) => {
  res.send(JSON.stringify({ responseData: questions.find((question) => question.id == req.params.id)}));
})

app.get('/applicants/:id', (req, res) => {
  res.send(JSON.stringify({ responseData: applicants.find((applicant) => applicant.id == req.params.id)}));
})

app.get('/test', (req, res) => {
  const { categoryId, level } = req.query;
  const resData = questions.filter((question) => question.categoryId == categoryId && question.level == level)
  res.send(JSON.stringify({ responseData: resData }));
  console.log(resData);
})

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});