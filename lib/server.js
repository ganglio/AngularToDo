var app, db, db_file, express, path, public_folder, sqlite3, views_folder;

express = require('express');

sqlite3 = require('sqlite3');

path = require('path');

app = express();

public_folder = path.join(__dirname, '..', 'public');

views_folder = path.join(__dirname, '..', 'views');

db_file = path.join(__dirname, '..', 'test.db');

db = new sqlite3.Database(db_file);

app.get('/', function(req, res) {
  return res.render('index.jade', {
    locals: {
      app_name: ''
    }
  });
});

app.get('/module', function(req, res) {
  return res.render('module.jade', {
    locals: {
      app_name: 'moduleDemo'
    }
  });
});

app.get('/data', function(req, res) {
  return db.all('SELECT * FROM entries', {}, function(err, rows) {
    if (typeof console !== "undefined" && console !== null) {
      console.log(rows);
    }
    return res.send(rows);
  });
});

app.put('/data/:id', function(req, res, stuff) {
  var id;
  id = req.params['id'];
  return console.log(stuff);
});

app.get('/data/:id', function(req, res) {
  var id;
  id = req.params['id'];
  return res.send(entries[id]);
});

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express["static"](public_folder));
  app.set('view engine', 'jade');
  app.set('views', views_folder);
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  return app.use(app.router);
});

if (typeof console !== "undefined" && console !== null) {
  console.log('Public folder: ' + public_folder);
}

if (typeof console !== "undefined" && console !== null) {
  console.log('DB file: ' + db_file);
}

app.listen(3000);
