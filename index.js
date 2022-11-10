const express = require('express');
const app = express();
const morgan = require('morgan');

const AppError = require('./AppError');

app.use(morgan('tiny'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!");
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        return next();
    }
    throw new AppError('Password required', 401);
    // res.send('PASSWORD NEEDED!')
    // res.status(401);
    // throw new Error('Password required!');

}

// app.use((req, res, next) => {
//     console.log("This is my first middleware!")
//     next();
// })
// app.use((req, res, next) => {
//     console.log("This is my second middleware!")
//     next();
// })

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE!');
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('WOOF WOOF!');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("My secret is: Sometimes I wear headphones in public so I don't have to talk to anyone");
})

app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin!', 403)
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

// custom error handler
// app.use((err, req, res, next) => {
//     console.log('*************************************');
//     console.log('****************ERROR****************');
//     console.log('*************************************');
//     //res.status(500).send('OH BOY WE GOT AN ERROR')
//     // console.log(err);
//     // have to pass error here
//     next(err);
// })

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})