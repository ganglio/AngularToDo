var app, db, db_file, express, http, path, public_folder, sqlite3, views_folder;

express = require('express');

http = require('http');

sqlite3 = require('sqlite3');

path = require('path');

app = express();

public_folder = path.join(__dirname, '..', 'public');

views_folder = path.join(__dirname, '..', 'views');

db_file = path.join(__dirname, '..', 'test.db');

db = new sqlite3.Database(db_file);

app.configure(function() {
  app.set('port', 3000);
  app.set('views', views_folder);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(require("connect").bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('652626bvhfdhghy52h5g'));
  app.use(express.session());
  app.use(express["static"](public_folder));
  return app.use(app.router);
});

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
    return res.send(rows);
  });
});

app.post('/data/:id', function(req, res) {
  var id;
  id = req.params['id'];
  db.run("INSERT INTO entries VALUES (?,?,?)", eq.body.id, req.body.name, req.body.success);
  return res.send(req.body);
});

app.put('/data/:id', function(req, res) {
  var id;
  id = req.params['id'];
  db.run("UPDATE entries SET success=? WHERE id=?", req.body.success, id);
  return res.send(req.body);
});

app.get('/data/:id', function(req, res) {
  var id;
  id = req.params['id'];
  return res.send(entries[id]);
});

if (typeof console !== "undefined" && console !== null) {
  console.log('Public folder: ' + public_folder);
}

if (typeof console !== "undefined" && console !== null) {
  console.log('DB file: ' + db_file);
}

http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});
