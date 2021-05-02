const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { Task, User } = require('./db/models');

const jwt = require('jsonwebtoken');

/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());

/* * GET/tasks */
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.send(e);
    });
});

/* * POST/tasks */
app.post('/tasks', (req, res) => {
    let taskName = req.body.taskName;
    let date = req.body.date;
    let status = req.body.status;
    let description = req.body.description;
    let newTask = new Task({
        taskName,
        date,
        status,
        description
    });
    newTask.save().then((taskDoc) => {
        res.send(taskDoc);
    });
});

/* * PATCH/tasks/:id */
app.patch('/tasks/:id', (req, res) => {
    Task.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

/* * DELETE/tasks/:id */
app.delete('/tasks/:id', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.id
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.listen(3000, () => {
    console.log('Server is listening in port 3000');
});