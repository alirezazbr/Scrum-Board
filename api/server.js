const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const mongoURL = 'mongodb://localhost:27017/MERN_Scrum_Board';

mongoose
    .connect(mongoURL, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

let Users = require('./routes/Users');

app.use('/users', Users);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});