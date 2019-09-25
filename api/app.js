const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors());

app.get('/api', (req, res) => {
    res.send('سلام دوستان');
});

app.listen(9000);