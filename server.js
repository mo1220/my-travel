//express module
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const config = require('./server/config/key');
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false  
}).then(() => console.log('MogoDB conncted...'))
  .catch(err => console.log(err))


const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/users', require('./server/routes/user'));


app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/index.html');
});

app.get('/list', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/list.html');
});
app.get('/detail', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/detail.html');
});
app.get('/mytrip', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/myTrip.html');
});
app.get('/register', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/register.html');
});
app.get('/login', (req, res) => {
    res.status(200).sendFile(__dirname + '/src/login.html');
});

app.listen(port, () => {
    console.log(`Server Listening on ${port}`);
})

// //node.js 서버
// const http = require('http');
// const fs = require('fs');
// const { response } = require('express');

// const app = http.createServer((request,response) => {
//     fs.readFile('./index.html', null, (err, data) => {
//         response.writeHead(200, {
//             "Content-Type": 'text/html'
//         });
//         response.write(data);
//         response.end();
//     })
// });
// app.listen(3000, () => {
//     console.log(`Server Listening on 3000`);
// })