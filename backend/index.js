// packages
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';


//config
import config from './config.js';

// routing
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import quoteRoutes from './routes/quote.routes.js'

// app setup
var app = express();
const PORT = config.port

// db setup 
const MONGODB_URI = config.mongoUri;

mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {dbName: "users"});
mongoose.connection.on('error', err => {
    throw new Error('Unable to connect to database: '+MONGODB_URI)
});
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully!")
});

app.use(cors()) // temp
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', quoteRoutes);

// 404 not found page
app.use(function(req, res, next) {
    res.send('Error 404: This page does not exist')
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
    } else if (err) {
        res.status(401).json({
            "error": err.name + ": " + err.message
        })
        console.log(err)
    }
})

app.listen(PORT, function() {
    console.log('Listening on http://localhost:'+PORT+'/');
})