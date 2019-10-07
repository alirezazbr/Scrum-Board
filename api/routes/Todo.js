const express = require('express');
const todoRoutes = express.Router();
const cors = require('cors');

const Todo = require('../models/Todo');
todoRoutes.use(cors());

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

module.exports = todoRoutes;