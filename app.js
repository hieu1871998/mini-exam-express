const express = require('express');
const app = express();
const port = 3187;
const questions = require('./data/questions.json');
const questionsDbPath = './data/questions.json';
const applicants = require('./data/applicants.json');
const applicantsDbPath = './data/applicants.json';
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
const fs = require('fs')
const _ = require('lodash');
const uniqid = require('uniqid');

app.use(cors());
app.use(bodyParser.json());

app.get('/admin/question', (req, res) => {
  const { pageSize, pageIndex } = req.query;
  const reqData = questions.slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
  console.log('Sending response');
  res.send({responseData: reqData});
});

app.post('/admin/question', (req, res) => {
  const newQuestion = req.body;
  newQuestion.id = uniqid();
  console.log(newQuestion);
  const questionsDb = JSON.parse(fs.readFileSync(questionsDbPath).toString());
  questionsDb.push(newQuestion);
  fs.writeFileSync(questionsDbPath, JSON.stringify(questionsDb));
  res.json(newQuestion);
});

app.post('/admin/question/delete', (req, res) => {
  const questionId = req.body.id;
  const questionsDb = JSON.parse(fs.readFileSync(questionsDbPath).toString());
  const questionIndex = questionsDb.map(q => q.id).indexOf(questionId);
  console.log(questionId);
  console.log(questionIndex);
  questionsDb.splice(questionIndex, 1);
  fs.writeFileSync(questionsDbPath, JSON.stringify(questionsDb));
  res.json(req.body);
})

app.get('/admin/applicant', (req, res) => {
  const { pageSize, pageIndex } = req.query;
  const reqData = applicants.slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
  res.send({responseData: reqData});
});

app.post('/admin/applicant', (req, res) => {
  const newApplicant = req.body;
  newApplicant.id = uniqid();
  newApplicant.status = 0;
  console.log(newApplicant);
  const applicantsDb = JSON.parse(fs.readFileSync(applicantsDbPath).toString());
  applicantsDb.push(newApplicant);
  fs.writeFileSync(applicantsDbPath, JSON.stringify(applicantsDb));
  res.json(newApplicant);
})

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