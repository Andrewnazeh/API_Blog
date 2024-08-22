const express = require('express');
require('dotenv').config();


const blogRouter = require('./routers/post');
const dbConnection = require('./config/connectionDB');

const app = express();

dbConnection();

app.use(express.json());

app.use(blogRouter);

app.listen(process.env.PORT, () => {
    console.log('Server running on port 3000');
});
