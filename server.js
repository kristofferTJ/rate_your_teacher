const express = require('express');
const connectDB = require('./config/db');

var cors = require('cors');

const app = express();

//Connect Database
connectDB();

// Init Middleware

app.use(express.json({ extended: false }));
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/teacherprofile', require('./routes/api/teacherprofile'));
app.use('/api/studentprofile', require('./routes/api/studentprofile'));
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/requests', require('./routes/api/requests'));
app.use('/api/contact', require('./routes/api/contact'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

