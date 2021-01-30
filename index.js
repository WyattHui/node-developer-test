const
  path = require('path'),
  NODE_ENV = process.env.NODE_ENV;
let envPath;

switch (NODE_ENV) {
  case 'production':
    envPath = '.env.production';
    break;
  default:
    envPath = '.env';
}

require('dotenv').config({
  path: path.resolve(process.cwd(), envPath)
});

const
  express = require('express'),
  app = express(),
  fs = require('fs'),
  index = fs.readFileSync('./index.html', 'utf8');

app.get('/', (req, res) => {
  res.send(index);
});
app.use('/v1', require('./routes'));

const
  server = require('http').Server(app),
  port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
