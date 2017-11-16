const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + './../'));

app.get('/', (req, res) => res.send('Server Message!'));

app.get('/test', (req, res) => {
  console.log('test get gotten');
  res.send('Get request success!');
})

let port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
