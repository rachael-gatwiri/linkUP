const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/route');
const dotenv = require('dotenv');
dotenv.config();

const app = express(); 

app.use(express.json()); 

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 


// app.use('/posts', Router);
app.use('/users', router);

app.use((err, req, res, next) => {
    res.json({
        error: err.message
        }) 
    })

app.listen(8005, () => {
    console.log('Server is listening on port 8005');
});

// base route: http://localhost:8005/api