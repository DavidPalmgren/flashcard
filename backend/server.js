const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection running successfully")
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
