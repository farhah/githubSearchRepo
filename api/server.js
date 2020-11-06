import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import session from 'express-session'
import mongoose from 'mongoose'

const app = express();

mongoose.connect('mongodb://localhost/yourDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Successfully connect to mongo'))
.catch(err => console.error('Connection error', err));


require('dotenv').config();

var allowCrossDomain = {
    origin: `${process.env.FRONTEND_URI}`,
    credentials: true
};

app.use(cors(allowCrossDomain));


app.use(session({
    secret: '1234567890 food is good',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    name: "id",
    cookie: {
        path: '/',
        secure: 'auto',
        httpOnly: true,
        maxAge: 3600000
    }
}))

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
});

// nodemon.emit('quit');