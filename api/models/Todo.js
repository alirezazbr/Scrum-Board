const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String
    },
    Description: {
        type: String
    },
    bgColor: {
        type: String
    },
    listStory: [{
        title: {
            type: String
        },
        Description: {
            type: String
        },
        bgColor: {
            type: String
        },
    }],
    // listTodo: [ArraySchema],
    // listInProgress: [ArraySchema],
    // listTest: [ArraySchema],
    // listDone: [ArraySchema],
});

module.exports = mongoose.model('Todo', TodoSchema);