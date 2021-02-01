const
  path = require('path'),
  NODE_ENV = process.env.NODE_ENV,
  express = require('express'),
  app = express(),
  passport = require('passport'),
  session = require('express-session');

let envPath;
switch (NODE_ENV) {
  case 'production':
    envPath = '.env.production.local';
    break;
  default:
    envPath = '.env.development.local';
}

require('dotenv').config({
  path: path.resolve(process.cwd(), envPath)
});

require('./mongoose')();
app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./libs/passport')(passport);

app.use('/', require('./routes'));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const
  server = require('http').Server(app),
  port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
