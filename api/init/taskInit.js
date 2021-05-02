const Task = require('../db/models/task.model');

const mongoose = require('mongoose');

// Connect to db
mongoose.connect('mongodb://localhost:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

const tasks = [
    new Task({
        taskName: 'Task One',
        date: '2018-12-06',
        status: '1',
        description: 'Test One'
    }),
    new Task({
        taskName: 'Task Two',
        date: '2019-12-06',
        status: '2',
        description: 'Test Two'
    }),
    new Task({
        taskName: 'Task Three',
        date: '2020-12-06',
        status: '3',
        description: 'Test Three'
    })
]

var done = 0;

for (var i = 0; i < tasks.length; i++) {
    tasks[i].save((error, doc) => {
        if (error) {
            console.log(error)
        }
        console.log(doc)
        done++
        if (done === tasks.length) {
            mongoose.disconnect();
        }
    });
}