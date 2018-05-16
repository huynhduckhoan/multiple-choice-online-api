const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const db = require('../utils/db');
const {User} = require('../models/user');
const {Bank} = require('../models/bank');
const {Group} = require('../models/group');
const {Question} = require('../models/question');
const {QuestionItem} = require('../models/questionItem');
const {Exam} = require('../models/exam');
const {ExamQuestion} = require('../models/examQuestion');
const {ExamStudent} = require('../models/examStudent');
const {ExamStudentDetail} = require('../models/examStudentDetail');

app.use(bodyParser.json())

//region user route
app.get('/user', (req, res) => {
  User.find().then((user) => {
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.post('/user', (req, res) => {
    var user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
        prename: req.body.prename,
        school: req.body.school,
        class: req.body.class,
        description: req.body.description,
    });
    // result = User.addUser(user);
    user.save().then((user) => {
      res.send(user);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/user/:userID', (req, res) => {
  var userID = req.params.userID;

  User.findOne({userID:userID}).then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };

  User.findOneAndUpdate(query, {
    role: req.body.role,
    password: req.body.password,
    name: req.body.name,
    prename: req.body.prename,
    school: req.body.school,
    class: req.body.class,
    description: req.body.description
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Invalid user supplied');
    }
    res.send(raw);
  });
});

app.delete('/user/:userID', (req, res) => {
  var query = { userID: req.params.userID };

  User.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid username supplied');
      }
    res.send(raw);
  });
});

//endregion

//region bank route
app.get('/bank', (req, res) => {
  Bank.find().then((bank) => {
    res.send({bank});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/bank', (req, res) => {
  var bank = new Bank({
    qbID: req.body.qbID,
    qbName: req.body.qbName,
    qbDescription: req.body.qbDescription,
  });
  bank.save().then((bank) => {
    res.send(bank);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Group.find(query).then((group) => {
    res.send(group);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.put('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Bank.findOneAndUpdate(query, {
    qbName: req.body.qbName,
    qbDescription: req.body.qbDescription,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question bank false');
    }
    res.send(raw);
  });
});

app.delete('/bank/:qbID', (req, res) => {
  var query = { qbID: req.params.qbID };

  Bank.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qbID supplied');
      }
    res.send(raw);
  });
});
//endregion

//region group route
app.get('/group', (req, res) => {
  Group.find().then((group) => {
    res.send({group});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/group', (req, res) => {
  var group = new Group({
    qgID: req.body.qgID,
    qbID: req.body.qbID,
    qgName: req.body.qgName,
    qgDescription: req.body.qgDescription
  });
  group.save().then((group) => {
    res.send(group);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/group/:qgID', (req, res) => {
  var query = { qgID: req.params.qgID };

  Question.find(query).then((group) => {
    res.send(group);
  }, (e) => {
    res.status(404).send('Question not found');
  });

});

app.put('/group/:qgID', (req, res) => {
  var query = { qgID: req.params.qgID };

  Group.findOneAndUpdate(query, {
    qbID: req.body.qbID,
    qgName: req.body.qgName,
    qgDescription: req.body.qgDescription
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question group false');
    }
    res.send(raw);
  });
});

app.delete('/group/:qbID', (req, res) => {
  var query = { qgID: req.params.qgID };

  Group.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qbID supplied');
      }
    res.send(raw);
  });
});
//endregion

//region question route
app.get('/question', (req, res) => {
  Question.find().then((question) => {
    res.send({question});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/question', (req, res) => {
  var question = new Question({
    qID: req.body.qID,
    qgID: req.body.qgID,
    type: req.body.type,
    qContent: req.body.qContent
  });
  question.save().then((question) => {
    res.send(question);
  }, (e) => {
    res.status(400).send('Add question item false');
  });
});

app.get('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  QuestionItem.find(query).then((questionItem) => {
    res.send({questionItem});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  Question.findOneAndUpdate(query, {
    qgID: req.body.qgID,
    type: req.body.type,
    qContent: req.body.qContent
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question group false');
    }
    res.send(raw);
  });
});

app.delete('/question/:qID', (req, res) => {
  var query = { qID: req.params.qID };

  Question.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qID supplied');
      }
    res.send(raw);
  });
});

//endregion

//region question item route

app.post('/question/:qID', (req, res) => {

  var questionItem = new QuestionItem({
    qiID: req.body.qiID,
    qID: req.params.qID,
    qiContent: req.body.qiContent,
    note: req.body.note,
    answer: req.body.answer,
  });
  questionItem.save().then((questionItem) => {
    res.send(questionItem);
  }, (e) => {
    res.status(400).send('Add question item false');
  });
});

app.put('/question/:qID/:qiID', (req, res) => {
  var query = { qiID: req.params.qiID };

  QuestionItem.findOneAndUpdate(query, {
    qID: req.params.qID,
    qiContent: req.body.qiContent,
    note: req.body.note,
    answer: req.body.answer,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(400).send('Update question group false');
    }
    res.send(raw);
  });
});

app.delete('/question/:qID/:qiID', (req, res) => {
  var query = { qiID: req.params.qiID };

  QuestionItem.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(400).send('Invalid qID supplied');
      }
    res.send(raw);
  });
});

//endregion

//region exam item route

app.get('/exam', (req, res) => {
  Exam.find().then((exam) => {
    res.send({exam});
  }, (e) => {
    res.status(404).send('Exam not found');
  });
});

app.post('/exam', (req, res) => {

  var exam = new Exam({
    eID: req.body.eID,
    eDescription: req.body.eDescription,
    questionsNumber: req.body.questionsNumber,
    time: req.body.time,
  });
  exam.save().then((exam) => {
    res.send(exam);
  }, (e) => {
    res.status(400).send('Add exam false');
  });
});

app.get('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };
  ExamQuestion.find(query).then((examQuestion) => {
      var questions = [];
      var qIDs = [];
      for (i in examQuestion) {
        qIDs.push(examQuestion[i].qID);
      }
      Question.find({
        'qID': { $in: qIDs }
      }).then((question) => {
        res.send(question);
      });
      console.log(questions);
    }, (e) => {
    res.status(400).send(e);
  });

});

app.post('/exam/:eID', (req, res) => {

  var examQuestion = new ExamQuestion({
    eqID: req.body.eID,
    eID: req.params.eID,
    qID: req.body.qID,
  });
  examQuestion.save().then((examQuestion) => {
    res.send(examQuestion);
  }, (e) => {
    res.status(404).send('Exam not found');
  });
});

app.put('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };

  Exam.findOneAndUpdate(query, {
    eDescription: req.body.eDescription,
    questionsNumber: req.body.questionsNumber,
    time: req.body.time,
  }, {upsert:true}, (e, raw) => {
    if (e) {
      res.status(404).send('Exam not found');
    }
    res.send(raw);
  });
});

app.delete('/exam/:eID', (req, res) => {
  var query = { eID: req.params.eID };

  Exam.findOneAndRemove(query, 
    (e, raw) => {
      if (e) {
        res.status(404).send('Exam not found');
      }
    res.send(raw);
  });
});

//endregion

//region student route

app.get('/student', (req, res) => {
  ExamStudent.find().then((examStudent) => {
    res.send({examStudent});
  }, (e) => {
    res.status(400).send(e);
  });
});


app.post('/student', (req, res) => {
    var examStudent = new ExamStudent({
        esID: req.body.esID,
        eID: req.body.eID,
        userID: req.body.userID,
        status: req.body.status,
        mark: req.body.mark,
    });
    examStudent.save().then((examStudent) => {
      res.send(examStudent);
    }, (e) => {
      res.status(400).send(e);
    });
});

//endregion

//region student route

app.post('/studentdetail', (req, res) => {
    var examStudentDetail = new ExamStudentDetail({
        esdID: req.body.esdID,
        esID: req.body.esID,
        eqID: req.body.eqID,
        responseChoice: req.body.responseChoice,
    });
    examStudentDetail.save().then((examStudentDetail) => {
      res.send(examStudentDetail);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/studentdetail/:esID', (req, res) => {
  var query = { esID: req.params.esID };

  ExamStudentDetail.find(query).then((examStudentDetail) => {
    res.send(examStudentDetail);
  }, (e) => {
    res.status(404).send('Question not found');
  });

});
//endregion

module.exports = app;