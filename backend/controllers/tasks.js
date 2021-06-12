const Task = require('../models/task');

exports.createTask = (req, res, next) => {
    const task = new Task({
        name: req.body.name,
        date: req.body.date,
        status: req.body.status,
        description: req.body.description,
        creator: req.userData.userId
    });
    task.save().then(createdTask => {
        res.status(201).json({
            message: 'Task Added Successfully!',
            task: {
                ...createdTask,
                id: createdTask._id
            }
        });
    }).catch(error => {
        res.status(500).json({
            message: 'Creating a Task Failed!'
        });
    });
};

exports.updateTask = (req, res, next) => {
    const task = new Task({
        _id: req.body.id,
        name: req.body.name,
        date: req.body.date,
        status: req.body.status,
        description: req.body.description,
        creator: req.userData.userId
    });
    Task.updateOne({ _id: req.params.id, creator: req.userData.userId },
        task
    ).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: 'Update Successful!' });
        } else {
            res.status(401).json({ message: 'Not Authorized!' });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Couldn't Udpate Task!"
        });
    });
};

exports.getTasks = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const taskQuery = Task.find();
    let fetchedTasks;
    if (pageSize && currentPage) {
        taskQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    taskQuery
        .then(documents => {
            fetchedTasks = documents;
            return Task.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: 'Tasks Fetched Successfully!',
                tasks: fetchedTasks,
                maxTasks: count
            });
        }).catch(error => {
            res.status(500).json({
                message: 'Fetching Tasks Failed!'
            });
        });
};

exports.getTask = (req, res, next) => {
    Task.findById(req.params.id).then(task => {
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: 'Task Not Found!' });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Fetching Task Failed!'
        });
    });
};

exports.deleteTask = (req, res, next) => {
    Task.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            console.log(result);
            if (result.n > 0) {
                res.status(200).json({ message: 'Deletion Successful!' });
            } else {
                res.status(401).json({ message: 'Not Authorized!' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting Tasks Failed!'
            });
        });
};